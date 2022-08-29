import React from 'react';
import {useNavigate} from "react-router-dom";



const Home =() => {
    const navigate = useNavigate();
    const goToCardPage = () => navigate('/card');
    const goToDungeonsPage = () => navigate ('/dungeons');
    const goToMiniaturesPage = () => navigate ('/miniatures');
    const goToOtherPage = () => navigate ('/other');
    const goToGamingPage = () => navigate ('/gaming');
    const goToAnimePage = () => navigate ('/anime');
    const goToComicsPage = () => navigate ('/comics');
    const goToBoardgamesPage = () => navigate ('/boardgames');

    return (
        <div>
            <div className='w-100%'>
                <div className='flex font-bangers text-6xl justify-center items-center mt-12'>Choose Your Category</div>
                <h2 className='justify-center items-center'></h2>
                <div className='grid grid-cols-4 justify-items-center items-center mt-16'>


                    <p> <div className='font-faster-one text-3xl ml-6'>Trading Cards</div>
                        <img onClick={goToCardPage}
                        src="https://images.unsplash.com/photo-1613771404721-1f92d799e49f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
                        className="p-4 h-80 max-w-md mt-12 pr-4" alt="test"></img>
                    </p>

                    <p> <div className='font-faster-one text-3xl ml-6'>Dungeons and Dragons</div>
                        <img onClick={goToDungeonsPage}
                              src="https://www.indiethoughts.com/wp-content/uploads/2016/12/Dungeon-And-Dragons-1024x709.jpg"
                              className="h-auto max-w-md mt-12 pr-4" alt="test"></img>
                    </p>

                    <p> <div className='font-faster-one text-3xl ml-6'>Miniatures</div>
                        <img onClick={goToMiniaturesPage}
                              src="https://images.unsplash.com/photo-1610888301741-26d484c42647?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80"
                              className="h-72 max-w-md h-62 w-62 mt-12 pr-4" alt="test"></img>
                    </p>

                    <p> <div className='font-faster-one text-3xl ml-6'>Other</div>
                        <img onClick={goToOtherPage}
                              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                              className="h-auto max-w-md mt-12 pr-4" alt="test"></img>
                    </p>

                    <p> <div className='font-faster-one text-3xl ml-6 mt-12'>Gaming</div>
                        <img onClick={goToGamingPage}
                              src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                              className="h-auto max-w-md mt-12 pr-4 mb-32" alt="test"></img>
                    </p>

                    <p> <div className='font-faster-one text-3xl ml-6 mt-12'>Anime</div>
                        <img onClick={goToAnimePage}
                              src="https://images.unsplash.com/photo-1613376023733-0a73315d9b06?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                              className="h-auto max-w-md mt-12 pr-4 mb-32" alt="test"></img>
                    </p>

                    <p> <div className='font-faster-one text-3xl ml-6 mt-12'>Comics</div>
                        <img onClick={goToComicsPage}
                              src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                              className="h-auto max-w-md mt-12 pr-4 mb-32" alt="test"></img>
                    </p>

                    <p> <div className='font-faster-one text-3xl ml-6 mt-12'>BoardGames</div>
                        <img onClick={goToBoardgamesPage}
                              src="https://images.unsplash.com/photo-1606503153255-59d8b8b82176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                              className="h-auto max-w-md mt-12 pr-4 mb-32" alt="test"></img>
                    </p>

                    {/*<p>  <img onClick={handleClick}*/}
                    {/*          src="https://www.svgrepo.com/show/321977/card-exchange.svg"*/}
                    {/*          className="h-auto max-w-md mt-12 pr-4 mb-32" alt="test"></img>*/}
                    {/*</p>*/}

                    {/*<p className='border-2  h-48 w-52 mb-4'>2nd Category</p>*/}
                    {/*<p className='border-2  h-48 w-52 mb-4'>3th Category</p>*/}
                    {/*<p className='border-2  h-48 w-52 mb-4'>4th Category</p>*/}
                    {/*<p className='border-2  h-48 w-52 mb-4'>5th Category</p>*/}
                    {/*<p className='border-2  h-48 w-52 mb-4'>6th Category</p>*/}
                    {/*<p className='border-2  h-48 w-52 mb-4'>7th Category</p>*/}
                    {/*<p className='border-2  h-48 w-52 mb-4'>8th Category</p>*/}

                </div>
            </div>
        </div>
    )
}
export default Home