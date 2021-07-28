import { DoubleMiniElement } from '@prisma/client';
import axios from 'axios';
import Head from 'next/head';
import React, { useState } from 'react';

import AddElementForm from '../components/DoubleMini/ElementForm';
import ElementSelector from '../components/DoubleMini/ElementSelector';
import { prisma } from '../prisma/db';

interface ElementProps {
  initialElements: DoubleMiniElement[];
}

export async function getServerSideProps() {
  const initialElements = await prisma.doubleMiniElement.findMany();
  return {
    props: {
      initialElements,
    },
  };
}

const saveElement = async (element: DoubleMiniElement) => {
  try {
    const { data } = await axios.post<DoubleMiniElement>('/api/elements', element);
    return data;
  } catch (error) {
    console.error('error:', error);
    return null;
  }
};

const updateElement = async (element: DoubleMiniElement) => {
  try {
    const { data } = await axios.put<DoubleMiniElement>(`/api/element/${element.id}`, element);
    return data;
  } catch (error) {
    console.error('error:', error);
    return null;
  }
};

const deleteElement = async (elementId: string) => {
  try {
    const { data } = await axios.delete<DoubleMiniElement>(`/api/element/${elementId}`);
    return data;
  } catch (error) {
    console.error('error:', error);
    return null;
  }
};

const getSelectedElement = (elementId: string | undefined, elements: DoubleMiniElement[] | undefined) => {
  if (elements && elementId) {
    return elements.find((element) => element.id === elementId);
  }
  return null;
};

const Elements = ({ initialElements }: ElementProps) => {
  const [elements, setElements] = useState<DoubleMiniElement[]>(initialElements);
  const [showForm, setShowForm] = useState(false);
  const [editElement, setEditElement] = useState<DoubleMiniElement | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Elements</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {showForm && (
        <AddElementForm
          setShowForm={setShowForm}
          element={editElement}
          onSubmit={async (element: DoubleMiniElement) => {
            if (editElement) {
              const editedElement = await updateElement(element);

              if (editedElement) {
                const elementIndex = elements.findIndex((el) => el.id === editedElement.id);
                const copy = [...elements];
                copy[elementIndex] = editedElement;
                setEditElement(null);
                setShowForm(false);
                setElements(copy);
              }
            }
            const savedElement = await saveElement(element);
            setShowForm(false);
            if (savedElement) setElements([...elements, savedElement]);
          }}
        />
      )}

      <div className="ml-5 mt-5 container">
        <h1 className="text-xl font-bold">
          Sprongen in de database
          <button
            type="button"
            className="text-white bg-green-400 py-1 px-2 rounded hover:bg-green-500 ml-5"
            onClick={() => {
              setEditElement(null);
              setShowForm(true);
            }}
          >
            Voeg toe
          </button>
        </h1>
        <ul className="mt-5">
          {elements.map((element) => (
            <li key={element.id} className="mt-3">
              <span>
                {element.name}
                {' '}
                -
                {element.figCode}
                {' '}
                -
                {element.difficulty}
              </span>
              <button
                type="button"
                className="text-white bg-yellow-400 py-1 px-2 rounded hover:bg-yellow-500 ml-5"
                onClick={async () => {
                  setShowForm(true);
                  setEditElement(element);
                }}
              >
                ✏️
              </button>
              <button
                type="button"
                className="text-white bg-red-400 py-1 px-2 rounded hover:bg-red-500 ml-2"
                onClick={async () => {
                  const deletedElement = await deleteElement(element.id);
                  if (deletedElement) {
                    const filtered = elements.filter((el) => el.id !== deletedElement.id);
                    setElements(filtered);
                  }
                }}
              >
                🗑
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <ElementSelector elements={elements} setSelectedId={setSelectedElementId} />
          {selectedElementId && (
            <table>
              <thead>
                <tr>
                  <th>Naam</th>
                  <th>figCode</th>
                  <th>Mhg</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{getSelectedElement(selectedElementId, elements)?.name}</td>
                  <td>{getSelectedElement(selectedElementId, elements)?.figCode}</td>
                  <td>{getSelectedElement(selectedElementId, elements)?.difficulty}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Elements;
