export const jsonFormatter = (input: string | object): any => {
  // Função auxiliar para converter snake_case para camelCase
  const toCamelCase = (str: string) =>
    str.replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("_", "").replace("-", "")
    );

  // Se for uma string JSON, faz o parse
  let jsonObject: any;
  if (typeof input === "string") {
    try {
      jsonObject = JSON.parse(input);
    } catch (error) {
      throw new Error("Invalid JSON string");
    }
  } else {
    jsonObject = input;
  }

  // Função recursiva para converter chaves em objetos aninhados
  const convertKeysToCamelCase = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map((item) => convertKeysToCamelCase(item));
    } else if (typeof obj === "object" && obj !== null) {
      return Object.keys(obj).reduce((acc, key) => {
        const camelKey = toCamelCase(key);
        acc[camelKey] = convertKeysToCamelCase(obj[key]);
        return acc;
      }, {} as any);
    }
    return obj;
  };

  return convertKeysToCamelCase(jsonObject);
};
