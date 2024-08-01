import { Imovel } from "site/sdk/types.ts";

export const getCaracteristicas = (imovel: Imovel) => {
  const caracteristicasFields = [
    "AreaTotal",
    "AreaPrivativa",
    "Dormitorios",
    "BanheiroSocialQtd",
    "Vagas",
    "Suites",
  ];

  // icomoon / fontawesome
  const caracteristicasIcons = {
    AreaTotal: "e902",
    AreaPrivativa: "e901",
    Dormitorios: "e908",
    BanheiroSocialQtd: "e903",
    Vagas: "e911",
    Suites: "Suites",
  };

  const caracteristicas = [];

  for (const field of caracteristicasFields) {
    if (Object.hasOwn(imovel, field)) {
      const value =
        imovel[field as keyof Omit<Imovel, "Foto" | "Caracteristicas" | "InfraEstrutura">] || "";

      const icon =
        caracteristicasIcons[field as keyof typeof caracteristicasIcons];

      if (value.length > 0 && value !== "0") {
        caracteristicas.push({ label: field, value: value, icon });
      }
    }
  }

  return caracteristicas;
};
