import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useUser } from './userContext';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const { user } = useUser();
  const sellerId = user?.id; // Replace with actual logic to get the seller ID

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axiosInstance.get(`/menu`);
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, [sellerId]);

  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems }}>
      {children}
    </MenuContext.Provider>
  );
};
