import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="py-6 bg-slate-50 text-white flex flex-col items-center justify-center font-primary">
      <p className="mb-4 text-lg text-gray-700">Made by</p>
      <ul className="flex space-x-4 mb-4">
        <li>
          <a
            href="https://x.com/Romeraso_HD"
            target="_blank"
            rel="noreferrer"
            className="text-palette-primary font-bold hover:text-white transition-colors"
          >
            Rodriguez Romero Jonathan
          </a>
        </li>
        <li>
          <a
            href="https://x.com/Romeraso_HD"
            target="_blank"
            rel="noreferrer"
            className="text-green-500 font-bold hover:text-white transition-colors"
          >
            Rodriguez Castro Luis Manuel
          </a>
        </li>
        <li>
          <a
            href="https://x.com/Romeraso_HD"
            target="_blank"
            rel="noreferrer"
            className="text-red-500 font-bold hover:text-white transition-colors"
          >
            Estrada Alvarez Adrian
          </a>
        </li>
      </ul>
      <p className="text-sm text-gray-700">
        <FontAwesomeIcon icon={faSchool} className="w-5 text-red-600 mx-1" />
        Tecnológico Nacional de México en Celaya
        <FontAwesomeIcon icon={faSchool} className="w-5 text-red-600 mx-1" />
      </p>
    </footer>
  );
}

export default Footer;
