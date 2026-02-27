import * as React from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Head,
  Section,
  Row,
  Column,
  Hr,
  Link,
  Img,
  Font,
} from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  email: string;
  reason: string;
  type?: string;
  description?: string;
  references?: string[];
  budget?: string;
  date?: string;
  message?: string;
}

const formatSimpleDate = (dateString?: string) => {
  if (!dateString) return "A definir";
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

export function EmailTemplate({
  name,
  email,
  reason,
  type,
  description,
  references,
  budget,
  date,
  message,
}: EmailTemplateProps) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Poppins"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css?family=Roboto",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Berkshire Swash"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://cdn.jsdelivr.net/npm/@fontsource/berkshire-swash/files/berkshire-swash-latin-400-normal.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src="https://res.cloudinary.com/dsirfm9gd/image/upload/v1771539540/auralis_imagotipo_pbj0ee.png"
              alt="Auralis Logo"
              width="200"
              style={logoImage}
            />
          </Section>
          <Text style={heading}>Nueva Solicitud de {name}</Text>
          <Section style={lisContainer}>
            <Img
              src="https://res.cloudinary.com/dsirfm9gd/image/upload/v1771542076/lis_e9v1uz.png"
              alt="Flor de Lis"
              width="500"
              style={logoImage}
            />
          </Section>

          <Section style={section}>
            <Text style={subHeading}>Detalles del Cliente</Text>
            <Row style={row}>
              <Column style={columnLabel}>Nombre:</Column>
              <Column style={columnValue}>{name}</Column>
            </Row>
            <Row style={row}>
              <Column style={columnLabel}>Email:</Column>
              <Column style={columnValue}>
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={subHeading}>Información del Proyecto</Text>
            <Row style={row}>
              <Column style={columnLabel}>Motivo de Contacto:</Column>
              <Column style={columnValue}>{reason}</Column>
            </Row>
            {type && (
              <Row style={row}>
                <Column style={columnLabel}>Tipo de Orden:</Column>
                <Column style={columnValue}>{type}</Column>
              </Row>
            )}
            {budget && (
              <Row style={row}>
                <Column style={columnLabel}>Presupuesto Estimado:</Column>
                <Column style={columnValue}>{budget}</Column>
              </Row>
            )}
            {date && (
              <Row style={row}>
                <Column style={columnLabel}>Fecha Estimada:</Column>
                <Column style={columnValue}>{formatSimpleDate(date)}</Column>
              </Row>
            )}
          </Section>

          <Hr style={hr} />

          {(description || message) && (
            <Section style={section}>
              <Text style={subHeading}>Detalles</Text>
              {description && (
                <>
                  <Text style={label}>Descripción:</Text>
                  <Text style={paragraph}>{description}</Text>
                </>
              )}
              {message && (
                <>
                  <Text style={label}>Mensaje:</Text>
                  <Text style={paragraph}>{message}</Text>
                </>
              )}
            </Section>
          )}

          {references && references.length > 0 && (
            <Section style={section}>
              <Hr style={hr} />
              <Text style={subHeading}>Referencias</Text>
              <Text style={paragraph}>
                El usuario ha adjuntado {references.length} archivo(s).
              </Text>
              <Row
                style={{ flexWrap: "wrap", gap: "10px" } as React.CSSProperties}
              >
                {references.map((refUrl, index) => {
                  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(refUrl);
                  return isImage ? (
                    <Column
                      key={index}
                      style={{ paddingRight: "10px", paddingBottom: "10px" }}
                    >
                      <Link href={refUrl} target="_blank">
                        <Img
                          src={refUrl}
                          alt={`Referencia ${index + 1}`}
                          width="150"
                          height="150"
                          style={{
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "1px solid #edc29e",
                          }}
                        />
                      </Link>
                    </Column>
                  ) : (
                    <Row key={index} style={row}>
                      <Link href={refUrl} style={link} target="_blank">
                        📄 Ver Archivo de Referencia {index + 1}
                      </Link>
                    </Row>
                  );
                })}
              </Row>
            </Section>
          )}
          <Section style={lisContainer}>
            <Img
              src="https://res.cloudinary.com/dsirfm9gd/image/upload/v1771542079/lis2_agkv9m.png"
              alt="Flor de Lis"
              width="500"
              style={logoImage}
            />
            <Text style={footer}>
              © {new Date().getFullYear()} Auralis. Todos los derechos
              reservados.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#0e0022",
  fontFamily: '"Poppins", "Helvetica Neue", Helvetica, Arial, sans-serif',
  padding: "40px",
};

const container = {
  backgroundColor: "#0e0022",
  border: "2px solid #edc29e",
  borderRadius: "20px",
  margin: "0 auto",
  padding: "40px",
  maxWidth: "580px",
};

const lisContainer = {
  textAlign: "center" as const,
  marginTop: "30px",
  marginBottom: "30px",
};

const logoContainer = {
  textAlign: "center" as const,
  marginTop: "30px",
  marginBottom: "30px",
};

const logoImage = {
  margin: "0 auto",
};

const heading = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "normal",
  textAlign: "center" as const,
  margin: "0 0 40px",
  fontFamily: '"Berkshire Swash", Helvetica,"Verdana", serif',
};

const subHeading = {
  color: "#edc29e",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 15px",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
};

const section = {
  margin: "20px 0",
};

const row = {
  margin: "10px 0",
};

const columnLabel = {
  color: "#b8bbbf",
  fontSize: "14px",
  fontWeight: "bold",
  width: "30%",
  verticalAlign: "top",
};

const columnValue = {
  color: "#ffffff",
  fontSize: "14px",
  width: "70%",
};

const label = {
  color: "#b8bbbf",
  fontSize: "14px",
  fontWeight: "bold",
  display: "block",
  marginTop: "20px",
  marginBottom: "5px",
};

const paragraph = {
  color: "#ffffff",
  fontSize: "14px",
  lineHeight: "24px",
  whiteSpace: "pre-wrap" as const,
};

const link = {
  color: "#edc29e",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#898f98",
  margin: "30px 0",
};

const footer = {
  color: "#898f98",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "40px",
};
