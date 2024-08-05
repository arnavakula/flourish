import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CSSTransition } from 'react-transition-group';
import '../assets/styles/CropDropdown.css'; // We'll create this for the CSS

const capitalize = (s) => {
    return s.toString().charAt(0).toUpperCase() + s.toString().slice(1);
}

const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
};

const darkenColor = (hex, percent) => {
    const bigint = parseInt(hex.slice(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    r = Math.max(0, Math.min(255, r - Math.round(r * (percent / 100))));
    g = Math.max(0, Math.min(255, g - Math.round(g * (percent / 100))));
    b = Math.max(0, Math.min(255, b - Math.round(b * (percent / 100))));

    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
};

const CropDropdown = ({ userCrops, crop }) => {
    const [expandCrop, setExpandCrop] = useState(true);

    return (
        <div className="ml-[4%]">
            <button className="flex justify-start gap-[5%] items-center" onClick={() => setExpandCrop(prev => !prev)}>
                {expandCrop ? <KeyboardArrowUpIcon style={{ color: '#63ab34' }} fontSize="small" /> : <KeyboardArrowDownIcon style={{ color: '#63ab34' }} fontSize="small" />}
                <h2>{capitalize(crop)}</h2>
            </button>

            <CSSTransition
                in={expandCrop}
                timeout={100}
                classNames="fade"
                unmountOnExit
            >
                <div>
                    {userCrops[crop].map((bunch, j) => (
                        <div 
                            key={j} 
                            className="border w-[90%] mx-auto px-3 rounded-lg"
                            style={{ 
                                backgroundColor: `rgba(${hexToRgb(bunch.color)}, 0.8)`,
                                borderColor: darkenColor(bunch.color, 20),
                                borderWidth: '1px', 
                                borderStyle: 'solid'}}
                        >
                            <h2>
                                {capitalize(crop)} - {bunch.quantity}
                            </h2>
                        </div>
                    ))}
                </div>
            </CSSTransition>
            <hr className="mx-auto w-[95%] h-[1.5px] my-4 bg-gray-300" />
        </div>
    )
}

export default CropDropdown;