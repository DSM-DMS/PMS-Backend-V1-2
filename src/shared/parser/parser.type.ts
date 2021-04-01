export abstract class DataParser<T> {
  protected parsingData: T | T[];
  public abstract getParsingData(): Promise<T>;
  public abstract setParsingData(data: T): void;
}