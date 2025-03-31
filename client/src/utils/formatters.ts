export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPokemonId = (id: number): string => {
  return id.toString().padStart(3, "0");
};

export const formatName = (name: string): string => {
  return name.replace(/-/g, " ");
};
