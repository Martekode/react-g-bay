import React, {Component} from 'react';
import {FaGithub} from "react-icons/fa";
class Footer extends Component {
    render() {
        return (
            <footer className='flex justify-evenly items-center h-16'>
                <p>Copyright @BECODE 2022 </p>
                <a href='https://github.com/glinchflash' >Glenn <FaGithub className='ml-3'/></a>
                <a href='https://github.com/YasserB94'>Yasser <FaGithub className='ml-3'/></a>
                <a href='https://github.com/MichaelMontei'>Michael <FaGithub className='ml-5'/></a>
                <a href='https://dengian.github.io/Knights-of-The-Pink-Unicorn/'>Ian <FaGithub className='ml-1'/></a>
                <a href='https://github.com/Martekode'>Brian <FaGithub className='ml-3'/></a>
            </footer>
        );
    }
}

export default Footer;