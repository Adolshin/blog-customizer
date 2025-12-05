import { useState, useRef } from 'react';
import clsx from 'clsx';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

export type OptionProps = {
	[key: string]: OptionType;
};

export type OnSubmit = {
	onSubmit(data: OptionProps): void;
};

export const ArticleParamsForm = ({ onSubmit }: OnSubmit) => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const [fontFamily, setFontFamily] = useState(fontFamilyOptions[0]);
	const [fontColor, setFontColor] = useState(fontColors[0]);
	const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
	const [contentWidth, setContentWidth] = useState(contentWidthArr[0]);
	const [fontSize, setFontSize] = useState(fontSizeOptions[0]);

	// useEffect(() => {
	// 	if (formRef.current) {
	// 		formRef.current.addEventListener('submit', function (e) {
	// 			e.preventDefault();
	// 			onSubmit({
	// 				fontFamily,
	// 				fontColor,
	// 				backgroundColor,
	// 				contentWidth,
	// 				fontSize,
	// 			});
	// 		});
	// 	}
	// }, [fontFamily,contentWidth]);
	const handleSubmitForm = (e: any) => {
		e.preventDefault();
		onSubmit({
			fontFamily,
			fontColor,
			backgroundColor,
			contentWidth,
			fontSize,
		});
		setIsOpen(!isOpen);
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} ref={formRef} onSubmit={handleSubmitForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						onChange={setFontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={fontSize}
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
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
