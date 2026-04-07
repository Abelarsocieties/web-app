# UI Components Inventory

This document tracks all reusable UI components in `/src/lib/ui/`.

## Component Library (shadcn-svelte)

All components are based on shadcn-svelte and can be customized as needed.

## Primitives

### Button
- **Location**: `/src/lib/ui/button/`
- **Variants**: 
  - `primary` (orange brand color)
  - `dark` (dark background)
  - `outline` (outlined)
  - `ghost` (minimal)
- **Usage**: All interactive buttons across the app

### Card
- **Location**: `/src/lib/ui/card/`
- **Usage**: Content containers, work cards, profile cards

### Table
- **Location**: `/src/lib/ui/table/`
- **Usage**: Admin tables, data listings

### Modal/Dialog
- **Location**: `/src/lib/ui/dialog/`
- **Usage**: Confirmations, forms, details

### Input
- **Location**: `/src/lib/ui/input/`
- **Usage**: Form inputs, search bars

### Select
- **Location**: `/src/lib/ui/select/`
- **Usage**: Dropdowns, filters

### Badge/Status Pill
- **Location**: `/src/lib/ui/badge/`
- **Usage**: Status indicators, tags

### Tabs
- **Location**: `/src/lib/ui/tabs/`
- **Usage**: Tabbed interfaces

### Pagination
- **Location**: `/src/lib/ui/pagination/`
- **Usage**: List pagination

## Layout Components

### PublicHeader
- **Location**: `/src/lib/components/PublicHeader.svelte`
- **Usage**: Header for public pages with dropdown navigation

### AuthedHeader
- **Location**: `/src/lib/components/AuthedHeader.svelte`
- **Usage**: Header for authenticated pages (dark variant with user pill + submit button)

### Footer
- **Location**: `/src/lib/components/Footer.svelte`
- **Usage**: Site footer

## Notes

- All components follow mobile-first responsive design
- Components are reusable and should not be duplicated
- Customize variants through Tailwind classes and component props

