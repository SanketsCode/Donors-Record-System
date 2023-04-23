import Link from "next/link";

const BasicCard = ({ title, icon, link, color }) => {
  return (
    <div className={`bg-gradient-to-r ${color} shadow sm:w-full p-5 rounded`}>
      <Link href={link}>
        <div className="bg-white rounded-md shadow w-full h-full flex flex-col justify-center items-center p-5 space-y-5">
          <div className="w-full">
            <p className="text-center md:text-2xl sm:text-xl font-medium mb-5">
              {title}
            </p>
            <hr />
          </div>
          <div className="bg-white p-2 rounded-full shadow">{icon}</div>
        </div>
      </Link>
    </div>
  );
};

export default BasicCard;
