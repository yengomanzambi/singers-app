class APIFilters {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  search() {
    const keyword = this.queryString.keyword
      ? {
          fullname: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};
    console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryString };
    console.log("####", queryCopy);
    const removeFields = ["keyword", "page"];
    console.log("{{{", removeFields);
    removeFields.forEach((el) => delete queryCopy[el]);

    this.query = this.query.find(queryCopy);
    return this;
  }
  pagination(restPerPage) {
    //
    const currentPage = Number(this.queryString.page) || 1;
    // restPerPage : nombre des pages q'on à pour la paginnation exemple 5
    //currentPage la page que nous voulons aller par exemple la page 2
    //donc skip : nombre d'info qu'on auras à sauter pour se rendre à la page 2 ça seras egale à 5
    //    5(2-1)= 5 donc pour se rendre a la page 2 il faut qu'on saute 5 enregistrement
    const skip = restPerPage * (currentPage - 1);
    this.query = this.query.limit(restPerPage).skip(skip);
    return this;
  }
}
export default APIFilters;
