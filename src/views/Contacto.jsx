import { useState } from "react";
import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Alert from "./Alerta";
import { ENDPOINT } from "../config/constans";

const Contacto = () => {
  const [contacto, setContacto] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );

  const handleUser = (event) =>
    setContacto({ ...contacto, [event.target.name]: event.target.value });

  const validarInput = (event) => {
    event.preventDefault();
    if (contacto.nombre === "") {
      return setError("Nombre Invalido");
    } else if (!validEmail.test(contacto.email)) {
      return setError("Correo invalido");
    } else if (contacto.mensaje === "") {
      return setError("Ingresa tu mensaje");
    }
    setError("");
    setSuccess("Pronto nos contactaremos contigo!!!");

    const enviarDatosBack = async () => {
      try {
        const response = await fetch(ENDPOINT.contacto, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contacto),
        });
        const respuestaBackend = await response.json();
        if (respuestaBackend.message) {
          setContacto({});
        }
      } catch (error) {
        throw new Error("Hubo un problema al enviar los datos.");
      }
    };
    enviarDatosBack();
  };

  return (
    <div className="contacto">
      <h3>CONTACTANOS</h3>
      <div>
        <form onSubmit={validarInput} className="publicacion">
          <FloatingLabel
            controlId="floatingTextarea"
            label="Nombre"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Nombre completo"
              name="nombre"
              value={contacto.nombre || ""}
              onChange={handleUser}
              className="input-contacto"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Correo Electronico"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              value={contacto.email || ""}
              onChange={handleUser}
              className="input-contacto"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea2"
            label="Deja tu mesaje aqui"
          >
            <Form.Control
              as="textarea"
              placeholder="Deja tu mesaje aqui"
              name="mensaje"
              value={contacto.mensaje || ""}
              onChange={handleUser}
              className="input-contacto"
            />
          </FloatingLabel>
          <Alert error={error} success={success} />
          <Button type="submit" variant="btn btn-outline-dark">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contacto;
