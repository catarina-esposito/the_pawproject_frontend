import "./Loader.css";

export default function Loader({ header }) {
    return (
        <div>
            <div className='loaderWrapper'>
                <div className='loader'></div>
            </div>
            <div className='loaderHeader'>{header}</div>
        </div>
    );
}
