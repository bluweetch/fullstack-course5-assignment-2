"use strict";

(() => {
  function generateRandomHash() {
    return (
      Date.now().toString(36) + Math.random().toString(36).substring(2, 10)
    ).toUpperCase();
  }

  const initialToBuyItems = [
    {
      name: "Cookies",
      quantity: 10,
    },
    {
      name: "Banana",
      quantity: 5,
    },
    {
      name: "Oreo",
      quantity: 2,
    },
    {
      name: "Coca-Cola",
      quantity: 20,
    },
    {
      name: "Colgate",
      quantity: 1,
    },
  ].map((item, index) => ({
    ...item,
    id: `${index + 1}${generateRandomHash()}`,
  }));

  function ShoppingListCheckOffService() {
    const service = this;

    service.toBuyItems = [...initialToBuyItems];
    service.buyedItems = [];

    service.getToBuyItems = () => {
      return this.toBuyItems;
    };

    service.getBuyedItems = () => {
      return this.buyedItems;
    };

    service.buy = (id) => {
      const toBuyItem = service.toBuyItems.find((item) => item.id === id);

      if (!toBuyItem) {
        return;
      }

      const toBuyItemIndex = service.toBuyItems.indexOf(toBuyItem);

      if (toBuyItemIndex === -1) {
        return;
      }

      service.toBuyItems.splice(toBuyItemIndex, 1);
      service.buyedItems.push(toBuyItem);
    };
  }

  //

  ToBuyController.$inject = ["ShoppingListCheckOffService"];

  function ToBuyController(shoppingListCheckOffService) {
    const controller = this;

    controller.items = shoppingListCheckOffService.getToBuyItems();

    controller.buy = (id) => {
      shoppingListCheckOffService.buy(id);
    };
  }

  //

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];

  function AlreadyBoughtController(shoppingListCheckOffService) {
    const controller = this;

    controller.items = shoppingListCheckOffService.getBuyedItems();
  }

  //

  const appModule = angular.module("ShoppingListCheckOffApp", []);

  appModule.service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  appModule.controller("ToBuyController", ToBuyController);
  appModule.controller("AlreadyBoughtController", AlreadyBoughtController);
})();
