// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_app from "./routes/_app.tsx";
import * as $BuscaImovel from "./islands/BuscaImovel.tsx";
import * as $CuradoriaItem from "./islands/CuradoriaItem.tsx";
import * as $Filters from "./islands/Filters.tsx";
import * as $OrderBy from "./islands/OrderBy.tsx";
import * as $PropertyProposal from "./islands/PropertyProposal.tsx";
import * as $SearchSelect from "./islands/SearchSelect.tsx";
import * as $ShareButton from "./islands/ShareButton.tsx";
import * as $SimpleSelect from "./islands/SimpleSelect.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_app.tsx": $_app,
  },
  islands: {
    "./islands/BuscaImovel.tsx": $BuscaImovel,
    "./islands/CuradoriaItem.tsx": $CuradoriaItem,
    "./islands/Filters.tsx": $Filters,
    "./islands/OrderBy.tsx": $OrderBy,
    "./islands/PropertyProposal.tsx": $PropertyProposal,
    "./islands/SearchSelect.tsx": $SearchSelect,
    "./islands/ShareButton.tsx": $ShareButton,
    "./islands/SimpleSelect.tsx": $SimpleSelect,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
