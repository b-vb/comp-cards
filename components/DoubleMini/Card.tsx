/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-alert */
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import useRouterRefresh from '../../hooks/useRouterRefresh';

import DoubleMiniCard from '../../types/doubleMiniCard';
import { formatDate } from '../../util/util';

interface CardProps {
  index: number;
  card: DoubleMiniCard;
}

const isEven = (value: number) => {
  if (value % 2 === 0) return true;
  return false;
};

const Card = ({ card, index }: CardProps) => {
  const refresh = useRouterRefresh();
  const deletedCard = async (cardId: string) => {
    try {
      const { data } = await axios.delete<DoubleMiniCard>(`/api/card/${cardId}`);
      refresh();
      return data;
    } catch (error) {
      console.error('error:', error);
      return null;
    }
  };
  return (
    <tr className={`border-b border-gray-200 hover:bg-gray-100 ${isEven(index) ? 'bg-gray-50' : ''}`}>
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <span className="font-medium">{card.name}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span>{formatDate(card.createdAt)}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span>{formatDate(card.updatedAt)}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex item-center justify-start">
          <Link href={`/card/${card.id}`} passHref>
            <a className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </a>
          </Link>
          <button
            type="button"
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              if (confirm('Weet je zeker dat je dit formulier wilt verwijderen?')) {
                deletedCard(card.id);
              }
            }}
            className="w-4 mr-2 transform pointer hover:text-purple-500 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Card;
