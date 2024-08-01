import { stringToCurrency } from "site/sdk/stringToCurrency.ts";
import { Imovel } from "site/sdk/types.ts";

export const getPrice = (imovel: Imovel) => {
  if (imovel.ValorVenda.length > 0 && imovel.ValorVenda !== "0") {
    return stringToCurrency(imovel.ValorVenda);
  } else if (imovel.ValorLocacao.length > 0 && imovel.ValorLocacao !== "0") {
    return stringToCurrency(imovel.ValorLocacao);
  } else if (imovel.ValorDiaria.length > 0 && imovel.ValorDiaria !== "0") {
    return stringToCurrency(imovel.ValorDiaria);
  }

  return "Consulte-nos";
};
