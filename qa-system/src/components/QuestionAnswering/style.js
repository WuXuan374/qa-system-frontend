import styled from 'styled-components'
export const BodyContainer = styled.div`
	font-size: 15px;
	color: #121212;
	font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, 
							Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
	.body-header div.ant-select-auto-complete {
		width: 30%;
		margin: auto 0;
	}
	.body-header div.ant-select-auto-complete > .ant-select-selector {
		border-radius: 25px;
		background: #f5f5f5;
	}
	.body-header div.ant-select-focused > .ant-select-selector {
		background: #fff;
	}
`
export const ContentContainer = styled.div`
	width: 94%;
	margin: 10px 2%;
	background-color: #ebebe0;
	border: 1px solid #669999;
	padding: 1%;
`
export const QuestionContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	margin: 10px 0;
`
export const QuestionTitle = styled.span`
	width: 10%;
`
export const ButtonsContainer = styled.div`
	width: 30%;
	display:flex;
	justify-content: flex-start;
	margin: auto 5%;
	padding: 0 10%;
	button {
		margin-right: 2%;
		border-radius: 25px;
	}
`
export const AnswerContainer = styled.div`
	padding: 16px 20px;
	background: #FFF;
	margin-bottom: 10px;
	border-radius: 2px;
	box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
`
export const DocumentTitle = styled.div`
	color: #444;
	font-weight: 600;
	margin-bottom: 10px;
	display: flex;
	justify-content: space-between; 
`
export const Score = styled.div`
	color: #76839b;
	font-size: 14px;
	margin-bottom: 4px;
`
export const Answer = styled.div``
export const ConcreteAnswer = styled.div``