import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	OptionProps,
} from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// const [fontFamily, setFontFamily] = useState(fontFamilyOptions[0]);
	// const [fontColor, setFontColor] = useState(fontColors[0]);
	// const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
	// const [contentWidth, setContentWidth] = useState(contentWidthArr[0]);
	// const [fontSize, setFontSize] = useState(fontSizeOptions[0]);

	const [formData, setFormData] = useState<OptionProps | null>(null);

	// const dataFromChild = {
	// 	fontFamily,
	// 	fontColor,
	// 	backgroundColor,
	// 	contentWidth,
	// 	fontSize,
	// };

	// const setDataFromChild = {
	// 	setFontFamily,
	// 	setFontColor,
	// 	setBackgroundColor,
	// 	setContentWidth,
	// 	setFontSize,
	// };

	const handleSubmit = (data: OptionProps) => {
		setFormData(data);
		console.log('Данные получены от дочернего компонента:', data);
		console.log(formData);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={handleSubmit} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
