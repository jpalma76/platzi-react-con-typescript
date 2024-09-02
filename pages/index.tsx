import { useState } from "react";
import { MouseEventHandler } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { random } from "lodash";
import { LazyImage } from "./components/RandomFox";

// generate a random function
//const random = () => Math.floor(Math.random() * 123) + 1;
const myRandom = () => random(1, 123);

// generate simple unic ID
const generateId = () => Math.random().toString(36).substr(2, 9);


const Home: NextPage = () => {
  const [images, setImages] = useState<Array<IFoxItems>>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    const newImageItem: IFoxItems = {
      id: generateId(),
      url: `https://randomfox.ca/images/${myRandom()}.jpg`,
    };

    setImages([...images, newImageItem]);
    /* window.plausible("addFox", {
      
    }) */
  };

  return (
    <div>
      <Head>
        <title>Platzi</title>
        <meta name="description" content="Generates by platzi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl text-center font-bold underline">
          Hello Platzi!
        </h1>
        <div className="w-full flex justify-center my-5">
          <button
            onClick={ addNewFox }
            className="px-4 py-2 bg-[green] text-white rounded-md"
          >
            Add new fox
          </button>
        </div>

        <div className="w-full mt-5 flex flex-col items-center">
          {images.map(({ id, url }) => (
            <div key={id} className="p-4">
              <LazyImage
                src={url} 
                width={320} 
                height="auto" 
                title="Random Fox"
                className="rounded-lg bg-gray-200" 
                onClick={() => console.log("hey")} 
              />
            </div>
          ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
