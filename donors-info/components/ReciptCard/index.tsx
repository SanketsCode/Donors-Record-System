import { recipt } from "@/Types/AllTypes";
import axios from "axios";

const ReciptCard = ({
  recipt_no,
  recipt_date,
  Donors_Name,
  Donors_Address,
  Donors_Money,
  refer,
  mobile,
}: recipt) => {
  const getPdf = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_PREFIX}/pdf`, {
        recipt_no,
        recipt_date,
        Donors_Name,
        Donors_Address,
        Donors_Money,
        refer,
        mobile,
      })
      .then((res) => {
        const pdfData = res.data;
        const pdfUrl = URL.createObjectURL(
          new Blob([pdfData], { type: "application/pdf" })
        );
        //Open the URL on new Window
        window.open(pdfUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="shadow rounded-md p-5">
      <p>Recipt no - {recipt_no}</p>
      <p>Recipt Date - {recipt_date}</p>
      <p>Donor Name - {Donors_Name}</p>
      <p>Donor Address - {Donors_Address}</p>
      <p>Money - {Donors_Money.$numberDecimal}</p>
      <p>Mobile - {mobile}</p>
      <p>Refer - {refer}</p>
      <button onClick={getPdf} className="btn-md w-full">
        Download
      </button>
    </div>
  );
};

export default ReciptCard;
