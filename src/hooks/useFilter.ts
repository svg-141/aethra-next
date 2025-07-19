import { useState } from 'react';

/**
 * Hook personalizado para manejar filtros seleccionables.
 * @param options Opciones de filtro disponibles
 * @param defaultValue Valor inicial del filtro
 */
export function useFilter<T extends string>(options: T[], defaultValue: T) {
  const [selected, setSelected] = useState<T>(defaultValue);

  // Cambia el filtro seleccionado
  const handleChange = (value: T) => {
    setSelected(value);
  };

  // Filtra una lista de items según el filtro seleccionado y una función de comparación
  function filterList<Item>(list: Item[], getType: (item: Item) => T | T[]): Item[] {
    if (selected === defaultValue) return list;
    return list.filter(item => {
      const type = getType(item);
      if (Array.isArray(type)) {
        return type.includes(selected);
      }
      return type === selected;
    });
  }

  return {
    selected,
    setSelected,
    handleChange,
    filterList,
    options,
  };
} 