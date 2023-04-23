module.exports.ReciptUI = (
  recipt_no,
  recipt_date,
  Donors_Name,
  Donors_Address,
  Donors_Money,
  refer,
  mobile
) => {
  return `<h1>Thank You</h1>
  
  <p>Recipt no - ${recipt_no}</p>
      <p>Recipt Date - ${recipt_date}</p>
      <p>Donor Name - ${Donors_Name}</p>
      <p>Donor Address - ${Donors_Address}</p>
      <p>Money - ${Donors_Money}</p>
      <p>Mobile - ${mobile}</p>
      <p>Refer - ${refer}</p>
  
  `;
};
