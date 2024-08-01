export interface Imovel {
  Codigo: string;
  Categoria: string;
  Status: string;
  DestaqueWeb: string;
  Cidade: string;
  Bairro: string;
  UF: string;
  ExibirNoSite: string;
  Exclusivo: string;
  FotoDestaque: string;
  CodigoImobiliaria: string;
  ValorVenda: string;
  ValorLocacao: string;
  ValorDiaria: string;
  AreaTotal: string;
  AreaPrivativa: string;
  Dormitorios: string;
  BanheiroSocialQtd: string;
  Vagas: string;
  Suites: string;
  Foto?: {
    [key: string]: {
      Codigo: string;
      Foto: string;
      FotoPequena: string;
      Destaque: "Sim" | "Nao";
    };
  };
  DescricaoWeb?: string;
  VlrDiariaBaixa?: string;
  ExibirValorDiariaBaixa?: string;
  ValorCondominio?: string;
  ValorIptu?: string;
  Caracteristicas?: {
    [key: string]: string;
  };
  InfraEstrutura?: {
    [key: string]: string;
  };
}
