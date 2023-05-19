import { Container } from "@mui/system";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import AdList from "../../../../components/admin/ads/AdList";
import BackButton from "../../../../components/BackButton";
import { AuthContext } from "../../../../contexts/AuthContext";
import Category from "../../../../components/admin/Category";

export default function index() {
  const { authToken, isAdmin } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    document.title = "Admin: Categories";
    if (!authToken || !isAdmin) router.push(`${router.basePath}/admin`);
  }, [authToken]);

  return (
    <>
      {authToken && isAdmin ? (
        <Container>
          <BackButton />
          <Category />
        </Container>
      ) : null}
    </>
  );
}
