export type CarModel = {
  name: string;
  image: string;
  amountCars: number;
};

export type CarColor = {
  carName: string;
  primaryColor: string;
  secondaryColor: string;
  tickColor: string;
  value: string;
  displayName: string;
  previewImage: string;
  finalImage: string;
};

export type Config = {
  carModels: CarModel[];
  carColors: Record<string, CarColor[]>;
};

export async function getConfig(): Promise<Config> {
  const config = await fetch("config.json");
  if (!config || !config.ok) {
    throw new Error("Failed to fetch config.json");
  }
  return await config.json();
};


export class CarInfoStore {
  private static config: Config | null = null;

  private static async loadConfig(): Promise<Config> {
    if (CarInfoStore.config) {
      return CarInfoStore.config;
    }
    const config = await getConfig();
    if (!config) {
      throw new Error("Failed to load config");
    }
    CarInfoStore.config = config;
    return config;
  }

  public static async getModels(): Promise<CarModel[]> {
    const config = await CarInfoStore.loadConfig();
    if (!config) {
      console.error("Failed to load config");
      return [];
    }
    return config.carModels;
  }

  public static async getModelByName(name: string): Promise<CarModel | undefined> {
    const config = await CarInfoStore.loadConfig();
    if (!config) {
      console.error("Failed to load config");
      return;
    }
    const model = config.carModels.find((car) => car.name === name);
    return model;
  }

  public static async getColorsByModel(model: string): Promise<CarColor[]> {
    const config = await CarInfoStore.loadConfig();
    if (!config) {
      console.error("Failed to load config");
      return [];
    }
    if (!config.carColors[model]) {
      return config.carColors[config.carModels[0].name];
    }
    return config.carColors[model];
  }
};