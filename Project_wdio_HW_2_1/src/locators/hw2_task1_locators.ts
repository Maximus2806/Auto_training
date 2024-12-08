export const dynamicControlsLocators = {
  removeButton: () => $('#checkbox-example > button'),
  mainTitle: () => $('.example h4'),
  subheader: () => $('.example p'),
  checkbox: () => $('input[type="checkbox"]'),
  addButton: () => $('//form/button[text()="Add"]'),
  removedConfirmation: () => $(`//form/p[text()="It's gone!"]`),
  returnConfirmation: () => $(`//form/p[text()="It's back!"]`)  
};
