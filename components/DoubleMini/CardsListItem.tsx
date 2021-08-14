import { EyeIcon, TrashIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import useRouterRefresh from '../../hooks/useRouterRefresh';
import DoubleMiniCardWithRoutinesAndElements from '../../types/doubleMiniCard';
import { formatDate } from '../../util/util';

interface Props {
  card: DoubleMiniCardWithRoutinesAndElements
}

const CardsListItem = ({ card }: Props) => {
  const refresh = useRouterRefresh();
  const deletedCard = async (cardId: string) => {
    try {
      const { data } = await axios.delete<DoubleMiniCardWithRoutinesAndElements>(`/api/card/${cardId}`);
      refresh();
      return data;
    } catch (error) {
      console.error('error:', error);
      return null;
    }
  };

  return (
    <tr key={card.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div>
            <div className="text-sm font-medium text-gray-900">{card.name}</div>
            <div className="text-sm text-gray-500">{card.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">Heren A</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(card.createdAt)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(card.updatedAt)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex item-center justify-around">
          <button
            className="w-4 mr-2 transform pointer hover:text-green-500 hover:scale-110"
            type="button"
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              if (confirm('Weet je zeker dat je dit formulier wilt verwijderen?')) {
                deletedCard(card.id);
              }
            }}
          >
            <TrashIcon className="h-6 w-6" />
          </button>
          <Link href={`/card/${card.id}`}>
            <a className="w-4 mr-2 transform pointer hover:text-green-500 hover:scale-110">
              <EyeIcon className="h-6 w-6" />
            </a>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default CardsListItem;
