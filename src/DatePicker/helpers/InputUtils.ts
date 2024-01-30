export class InputUtils {
  constructor(){}
  setSelectionIntervalByType(type){
    
  }

  getSelectionRangeByPosition(position: number, dateMask) {
    let start = 0;
    let end = 0;
    let type;
    for (let i = 0; i < dateMask.positions.length; i++) {
      type = dateMask.positions[i];
      const sectionLength = dateMask.positions[i].length;
      if (sectionLength >= position) {
        end = start + sectionLength;
        break;
      } else {
        start += sectionLength + dateMask.separator.length;
        position -= sectionLength + dateMask.separator.length;
      }
    }
    return { start, end, type };
  

  }
}
