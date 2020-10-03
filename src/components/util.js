const Util = {
  getYearsOld (bornDate) {
    const dob = Util.getDateFromString(bornDate)
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  },
  getDateFromString (date) {
    const partsDate = date.split('/')
    if (partsDate.length === 3) {
      const year = parseInt(partsDate[2])
      const month = parseInt(partsDate[1]) - 1
      const day = parseInt(partsDate[0])
      return new Date(year,month,day)
    } else {
      return null
    }
  }
}

export default Util