export interface resUser {
    username: string;
    mobile: string;
  }

  export interface contextUser {
    currentAdmin: null | resUser;
    setCurrentAdmin: (user: resUser) => null;
  }

  export interface MyProp {
    children: JSX.Element;
  }
  

  export interface recipt {
    recipt_no : string;
    recipt_date:string;
    Donors_Name:string;
    Donors_Address:string;
    Donors_Money:{
        $numberDecimal : number
    };
    refer:string,
    mobile:string
}