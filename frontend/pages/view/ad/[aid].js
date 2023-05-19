import { Container } from "@mui/system";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import AdDetails from "../../../components/AdDetails";
import BackButton from "../../../components/BackButton";
import { getAd } from "../../../connections/ads";
import { getCategory } from "../../../connections/category";
import { getImages } from "../../../connections/upload-image";
import { AuthContext } from "../../../contexts/AuthContext";
import { NavContext } from "../../../contexts/NavContext";

export default function ViewProduct() {
  const { authToken, setAdmin } = useContext(AuthContext);

  const router = useRouter();
  const [ad, setAd] = useState({});
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const aid = router.query.aid;

  useEffect(() => {
    setAdmin();

    if (!aid) return;
    // console.log(aid);

    getAd(
      { authToken, aid },
      {
        success: (res) => {
          const data = res.data.data;
          if (!data.error) {
            document.title = data.title;

            setAd(data);

            console.log(data);
            getCategory(
              { categoryId: data.categoryId },
              {
                success: (res) => {
                  const data = res.data.data;
                  setCategory(data.name);
                },
                error: (err) => {},
              }
            );
          }
        },
        error: (err) => {},
      }
    );

    getImages(
      { ownerId: `ad${aid}` },
      {
        success: (res) => {
          const data = res.data.data;
          setImages(data.urls);
        },
        error: (err) => {},
      }
    );
  }, [aid]);

  return (
    <Container>
      <BackButton />

      <br />
      <br />
      <AdDetails
        authToken={authToken}
        ad={ad}
        images={images}
        category={category}
      />
    </Container>
  );
}
