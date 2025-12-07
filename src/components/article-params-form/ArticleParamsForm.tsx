import { useState, FormEvent, useEffect } from 'react';
import clsx from 'clsx';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

export type formProps = {
	onSubmit(data: ArticleStateType): void;
};

export const ArticleParamsForm = ({ onSubmit }: formProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [fontFamilyOption, setFontFamily] = useState(defaultArticleState.fontFamilyOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(defaultArticleState.backgroundColor);
	const [contentWidth, setContentWidth] = useState(defaultArticleState.contentWidth);
	const [fontSizeOption, setFontSize] = useState(defaultArticleState.fontSizeOption);

	const handleSubmitForm = (e: FormEvent) => {
		e.preventDefault();
		onSubmit({
			fontFamilyOption,
			fontColor,
			backgroundColor,
			contentWidth,
			fontSizeOption,
		});
	};

	const handleResetForm = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);
	};

	const handleClickOutside = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<>
			<div onClick={(e) => e.stopPropagation()}>
				<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
				<aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
					<form className={styles.form} onSubmit={handleSubmitForm}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							selected={fontFamilyOption}
							onChange={setFontFamily}
							options={fontFamilyOptions}
							title='Шрифт'
						/>
						<RadioGroup
							selected={fontSizeOption}
							name='radio'
							onChange={setFontSize}
							options={fontSizeOptions}
							title='Размер шрифта'
						/>
						<Select
							selected={fontColor}
							onChange={setFontColor}
							options={fontColors}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={backgroundColor}
							onChange={setBackgroundColor}
							options={backgroundColors}
							title='Цвет фона'
						/>
						<Select
							selected={contentWidth}
							onChange={setContentWidth}
							options={contentWidthArr}
							title='Ширина контента'
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='submit' type='clear' onClick={handleResetForm} />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
