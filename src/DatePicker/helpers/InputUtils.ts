import { DateValues } from "../types/DateValues";
import { DateMask } from "./DateMask";

export class DateInputModel {
  element: HTMLInputElement | null = null;
  private dateMask: DateMask;
  constructor(dateMask: DateMask) {
    this.dateMask = dateMask;
  }

  setElement(element: HTMLInputElement | null) {
    this.element = element;
  }

  setValueByDateValue(dateValue: DateValues) {
    if (this.element) {
      this.element.value = this.dateMask.getMaskByDates(
        dateValue.getStringValues(),
      );
    }
  }

  setCurrentRange() {
    const { start, end } = this.getCurrentRange();
    this.element?.setSelectionRange(start, end);
  }

  getCurrentRange() {
    const position = this.getElementStartPosition();
    return this.getSelectionRangeByPosition(position);
  }

  getElementStartPosition() {
    return this.element?.selectionStart || 0;
  }

  setFirstRange() {
    const { start, end } = this.getSelectionRangeByPosition(0);
    this.element?.setSelectionRange(start, end);
  }

  hasNextRange() {
    const position = this.getElementStartPosition();
    const { end } = this.getSelectionRangeByPosition(position);
    return end + this.dateMask.separator.length <= this.dateMask.mask.length;
  }

  setPrevRange() {
    const { start, end } = this.getPrevRange();
    this.element?.setSelectionRange(start, end);
  }

  getPrevRange() {
    const position = this.getElementStartPosition();
    const { start } = this.getSelectionRangeByPosition(position);
    return this.getSelectionRangeByPosition(
      start - this.dateMask.separator.length,
    );
  }

  setNextRange() {
    const { start, end } = this.getNextRange();
    this.element?.setSelectionRange(start, end);
  }

  setCircleNextRange() {
    if (this.hasNextRange()) {
      this.setNextRange();
    } else {
      this.setFirstRange();
    }
  }

  getNextRange() {
    const position = this.getElementStartPosition();
    const { end } = this.getSelectionRangeByPosition(position);
    return this.getSelectionRangeByPosition(
      Math.min(
        end + this.dateMask.separator.length,
        this.dateMask.mask.length - 1,
      ),
    );
  }

  getSelectionRangeByPosition(position: number) {
    let start = 0;
    let end = 0;
    let type;
    for (let i = 0; i < this.dateMask.positions.length; i++) {
      type = this.dateMask.types[i];
      const sectionLength = this.dateMask.positions[i].length;
      if (sectionLength >= position) {
        end = start + sectionLength;
        break;
      } else {
        start += sectionLength + this.dateMask.separator.length;
        position -= sectionLength + this.dateMask.separator.length;
      }
    }
    return { start, end, type };
  }
}
