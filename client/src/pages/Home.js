import React from 'react';

const handleClick = event => {
    window.open("http://localhost:3050/test","_self");
};

const Home =() => {
    return (

        <div>
            <div className='w-100%'>
                <h2 className='justify-center items-center'></h2>
                <div className='grid grid-cols-4 justify-items-center items-center mt-20'>


                    <p> <img onClick={handleClick}
                        src="https://images.unsplash.com/photo-1613771404721-1f92d799e49f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
                        className="p-4 h-80 max-w-md mt-12 pr-4" alt="test"></img>
                    </p>

                    <p>  <img onClick={handleClick}
                              src="https://images.unsplash.com/photo-1593814681464-eef5af2b0628?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                              className="h-auto max-w-md mt-12 pr-4" alt="test"></img>
                    </p>

                    <p>  <img onClick={handleClick}
                              src="https://images.unsplash.com/photo-1610888301741-26d484c42647?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80"
                              className="h-72 max-w-md h-62 w-62 mt-12 pr-4" alt="test"></img>
                    </p>

                    <p>  <img onClick={handleClick}
                              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                              className="h-auto max-w-md mt-12 pr-4" alt="test"></img>
                    </p>

                    <p>  <img onClick={handleClick}
                              src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                              className="h-auto max-w-md mt-12 pr-4 mb-32" alt="test"></img>
                    </p>

                    <p>  <img onClick={handleClick}
                              src="https://images.unsplash.com/photo-1613376023733-0a73315d9b06?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                              className="h-auto max-w-md mt-12 pr-4 mb-32" alt="test"></img>
                    </p>

                    <p>  <img onClick={handleClick}
                              src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                              className="h-auto max-w-md mt-12 pr-4 mb-32" alt="test"></img>
                    </p>

                    <p>  <img onClick={handleClick}
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