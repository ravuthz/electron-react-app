import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import DOMPurify from "dompurify";

import MyDiv from "./MyDiv";
import MyCard from "./MyCard";

const dot = `•`;
const dotSpan = `<span class="red-dot">•</span>`;

// const bigDot = `🔴`;
// const bigDotSpan = `<span class="red-dot">🔴</span>`;

const FORBID_TAGS = [
  "a",
  "p",
  "span",
  "img",
  "div",
  "main",
  "section",
  "article",
  "table",
  "ul",
  "ol",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "button",
];

const WhiteSpaceStarReplacer = () => {

  const { handleSubmit, handleChange, values, setValues } = useFormik({
    initialValues: { text1: "", text2: "", html: "" },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  // const onText1Change = (e) => {
  //   handleChange(e);
  //   const text = e.target.value;
  //   const space = new RegExp("\\s", "gmu");
  //   if (space.test(text)) {
  //     const text1 = text
  //       .replaceAll(/\r/g, dot)
  //       .replaceAll(/\n/g, dot)
  //       .replaceAll(/\f/g, dot)
  //       .replaceAll(/\v/g, dot)
  //       // .replace(/\u0020/gu, '*')
  //       // .replace(/\u00a0/gu, '+')
  //       // .replace(/\u2009/gu, '-')
  //       // .replace(/\u200a/gu, 'x')
  //       .replaceAll(/\u200b/gu, dot);
  //     setValues((old) => ({ ...old, text1 }));
  //   } else {
  //     setValues((old) => ({ ...old, text }));
  //   }
  // };

  const onDivChange = (text) => {
    const html = DOMPurify.sanitize(text, { FORBID_TAGS })
      .replaceAll(/\u200b/gu, "•")
      .replaceAll(dot, dotSpan);
    setValues((old) => {
      console.log({ old, html });
      return { ...old, html};
    });
  };

  // const onText2Change = (text, delta, source, editor) => {
  //   // const space = new RegExp("\\s", "gmu");

  //   // console.log({ text, delta, source, editor });

  //   const text2 = text
  //     .replaceAll(/\r/g, dot)
  //     .replaceAll(/\n/g, dot)
  //     .replaceAll(/\f/g, dot)
  //     .replaceAll(/\v/g, dot)
  //     // .replace(/\u0020/gu, '*')
  //     // .replace(/\u00a0/gu, '+')
  //     // .replace(/\u2009/gu, '-')
  //     // .replace(/\u200a/gu, 'x')
  //     .replaceAll(/\u200b/gu, dot);

  //   console.log(text);
  //   console.log(text2);

  //   setValues((old) => ({ ...old, text2: `<p>${text2}</p>` }));

  //   // if (space.test(text)) {
  //   //   const text2 = text
  //   //     .replaceAll(/\r/g, dot)
  //   //     .replaceAll(/\n/g, dot)
  //   //     .replaceAll(/\f/g, dot)
  //   //     .replaceAll(/\v/g, dot)
  //   //     // .replace(/\u0020/gu, '*')
  //   //     // .replace(/\u00a0/gu, '+')
  //   //     // .replace(/\u2009/gu, '-')
  //   //     // .replace(/\u200a/gu, 'x')
  //   //     .replaceAll(/\u200b/gu, dot);
  //   //   setValues((old) => ({ ...old, text2 }));
  //   // } else {
  //   //   setValues((old) => ({ ...old, text }));
  //   // }
  // };

  // const onCleanSymbol = () => {
  //   const text1 = values.text1.replaceAll(dot, "");
  //   setValues((old) => ({ ...old, text1 }));
  // };

  const onCopyText = async () => {
    const { html } = values;
    let text1 = DOMPurify.sanitize(html, { FORBID_TAGS })
      .replaceAll(new RegExp(dotSpan, "gu"), "")
      .replaceAll(dot, "");
    setValues((old) => ({ ...old, html: text1 }));
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text1);
    } else {
      return document.execCommand("copy", true, text1);
    }
  };

  const onClearText = () => {
    setValues({
      text1: "",
      text2: "",
      html: "",
    });
  };

  return (
    <MyCard title="White Space Replacer">
      <Form noValidate onSubmit={handleSubmit} className="form-space-replacer">
        <Row>
          {/* <Col>
            <Form.Group className="mb-3" controlId="text1">
              <Form.Control
                as="textarea"
                ref={element1}
                rows={15}
                name="text1"
                value={values.text1}
                onChange={onText1Change}
              />
            </Form.Group>
          </Col> */}
          <Col>
            <Form.Group controlId="html">
              <MyDiv
                className="form-control mb-3"
                value={values.html}
                onChange={onDivChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Button
              variant="primary"
              onClick={onCopyText}
              disabled={!values.html}
            >
              Auto Clean
            </Button>
          </Col>
          <Col xs={{ span: 4, offset: 4 }} style={{ textAlign: "right" }}>
            <Button
              variant="danger"
              onClick={onClearText}
              disabled={!values.html}
            >
              Clear Text
            </Button>
          </Col>
        </Row>
      </Form>
    </MyCard>
  );
};

export default WhiteSpaceStarReplacer;
