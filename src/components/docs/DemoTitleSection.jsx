import ReactHtmlParser from 'html-react-parser'

const DemoTitleSection = (props) => {
    const { title, desc = '', className } = props

    return (
        <div className={className}>
            <h2 className="mb-3">{title}</h2>
            <p className="whitespace-pre-line">{ReactHtmlParser(desc)}</p>
        </div>
    )
}

export default DemoTitleSection
