import { GenericRequest } from "./generic.request";

export class ProductRequest extends GenericRequest {

  private productRef: string;
  private productLot: string;
  private productManufacturer: string;
  private productNotes: string;
  private productPurchaseDate: string;
  private purchaseDateFrom: string;
  private purchaseDateTo: string;
  private productSeriesCodesList: string[];

  /**
   * Getter $productRef
   * @return {string}
   */
  public get $productRef(): string {
    return this.productRef;
  }

  /**
   * Setter $productRef
   * @param {string} value
   */
  public set $productRef(value: string) {
    this.productRef = value;
  }

  /**
   * Getter $productLot
   * @return {string}
   */
  public get $productLot(): string {
    return this.productLot;
  }

  /**
   * Setter $productLot
   * @param {string} value
   */
  public set $productLot(value: string) {
    this.productLot = value;
  }

  /**
    * Getter $productManufacturer
    * @return {string}
    */
  public get $productManufacturer(): string {
    return this.productManufacturer;
  }

  /**
   * Setter $productManufacturer
   * @param {string} value
   */
  public set $productManufacturer(value: string) {
    this.productManufacturer = value;
  }

  /**
    * Getter $productNotes
    * @return {string}
    */
  public get $productNotes(): string {
    return this.productNotes;
  }

  /**
   * Setter $productNotes
   * @param {string} value
   */
  public set $productNotes(value: string) {
    this.productNotes = value;
  }

  /**
   * Getter $productPurchaseDate
   * @return {string}
   */
  public get $productPurchaseDate(): string {
    return this.productPurchaseDate;
  }

  /**
   * Setter $productPurchaseDate
   * @param {string} value
   */
  public set $productPurchaseDate(value: string) {
    this.productPurchaseDate = value;
  }

  /**
 * Getter $purchaseDateFrom
 * @return {string}
 */
  public get $purchaseDateFrom(): string {
    return this.purchaseDateFrom;
  }

  /**
   * Setter $purchaseDateFrom
   * @param {string} value
   */
  public set $purchaseDateFrom(value: string) {
    this.purchaseDateFrom = value;
  }

  /**
   * Getter $purchaseDateTo
   * @return {string}
   */
  public get $purchaseDateTo(): string {
    return this.purchaseDateTo;
  }

  /**
   * Setter $purchaseDateTo
   * @param {string} value
   */
  public set $purchaseDateTo(value: string) {
    this.purchaseDateTo = value;
  }


  /**
   * Getter $productSeriesCodesList
   * @return {string[]}
   */
  public get $productSeriesCodesList(): string[] {
    return this.productSeriesCodesList;
  }

  /**
   * Setter $productSeriesCodesList
   * @param {string[]} value
   */
  public set $productSeriesCodesList(value: string[]) {
    this.productSeriesCodesList = value;
  }

}
