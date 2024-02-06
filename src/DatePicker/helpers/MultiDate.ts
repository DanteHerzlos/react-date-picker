export class MultiDate {
  values: Map<string, Date>
  constructor(dates: Date[]){
    this.values = this.getMapFromArray(dates)
  }

  addDate(date: Date){
    this.values.set(date.toString(), date)
  }

  removeDate(date: Date){
    this.values.delete(date.toString())
  }

  toggleDate(date: Date){
    if(this.values.has(date.toString())){
      this.removeDate(date)
    }else {
      this.addDate(date)
    }
  }

  getValues(){
    return [...this.values.values()]
  }

  clear() {
    this.values.clear()
  }
  
  setDates(dates:Date[]){
    this.clear()
    this.values = this.getMapFromArray(dates)
  }

  private getMapFromArray(dates:Date[]){
    return new Map(dates.map(date => [date.toString(), date]))
  }

}
