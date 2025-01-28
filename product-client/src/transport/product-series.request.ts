import { GenericRequest } from "./generic.request";

export class ProductSeriesRequest extends GenericRequest {

  private productSeriesCode: string;
  private connectedProductsIds: number[] = [];
  private unconnectedProductsIds: number[] = [];

  /**
  * Getter $productSeriesCode
  * @return {string}
  */
  public get $productSeriesCode(): string {
    return this.productSeriesCode;
  }

  /**
   * Setter $productSeriesCode
   * @param {string} value
   */
  public set $productSeriesCode(value: string) {
    this.productSeriesCode = value;
  }
  /**
   *
  /**
 * Getter $connectedProductsIds
 * @return {number[]}
 */
  public get $connectedProductsIds(): number[] {
    return this.connectedProductsIds;
  }

  /**
   * Setter $connectedProductsIds
   * @param {number[]} value
   */
  public set $connectedProductsIds(value: number[]) {
    this.connectedProductsIds = value;
  }

  /**
* Getter $unconnectedProductsIds
* @return {number[]}
*/
  public get $unconnectedProductsIds(): number[] {
    return this.unconnectedProductsIds;
  }

  /**
   * Setter $unconnectedProductsIds
   * @param {number[]} value
   */
  public set $unconnectedProductsIds(value: number[]) {
    this.unconnectedProductsIds = value;
  }
}
