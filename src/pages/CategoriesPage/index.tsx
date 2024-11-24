import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import TableComponent from "../../components/TableComponent";
import Loader from "../../components/Loader";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import PageHeader from "../../components/PageHeader";
import { useTranslation } from "react-i18next";
import ButtonComponent from "../../components/ButtonComponent";
import { Add } from "@mui/icons-material";

// Simulación de obtención de categorías (reemplazar con tu servicio real)
const useMockCategories = () => {
  const [categories, setCategories] = useState<any[]>([
    {
      category_id: 71,
      name: "Test",
      user_id: 38,
      created_at: "2024-11-21T10:12:35.081Z",
      updated_at: "2024-11-21T10:12:35.081Z",
      Budget: [],
      subcategories: [],
      Transaction: [],
    },
    {
      category_id: 72,
      name: "Example Category",
      user_id: 40,
      created_at: "2024-11-20T08:00:00.000Z",
      updated_at: "2024-11-21T08:00:00.000Z",
      Budget: [],
      subcategories: [],
      Transaction: [],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    // Simulación de carga de datos
    setLoading(false);
  }, []);

  return { categories, loading, error };
};

export const CategoriesPage = () => {
  const { categories, loading, error } = useMockCategories();
  const { t } = useTranslation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showMessage = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleView = (category: any) => {
    console.log(t("VIEWING_CATEGORY"), category);
    showMessage(`${t("VIEWING_CATEGORY")}: ${category.name}`);
  };

  const handleEdit = (category: any) => {
    console.log(t("EDITING_CATEGORY"), category);
    showMessage(`${t("EDITING_CATEGORY")}: ${category.name}`);
  };

  const handleDelete = (category: any) => {
    console.log(t("DELETING_CATEGORY"), category);
    showMessage(`${t("DELETING_CATEGORY")}: ${category.name}`);
  };

  if (loading) return <Loader overlayVariant="transparent" />;
  if (error) {
    return (
      <ErrorSnackbar
        message={t("ERROR_LOADING_DATA")}
        open={true}
        onClose={handleSnackbarClose}
        severity="error"
      />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <PageHeader titleKey={t("CATEGORY_PAGE")} />

      <Box display="flex" justifyContent="flex-end" sx={{ p: 2 }}>
        <ButtonComponent
          label={t("CREATE_CATEGORY")}
          color="primary"
          variant="outlined"
          size="medium"
          isLoading={false}
          startIcon={<Add />}
          SxProps={{ mb: 2, alignContent: "flex-end", display: "flex" }}
          onClick={() => {
            showMessage(t("CREATE_CATEGORY_CLICK"));
          }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <TableComponent<any>
          rows={categories}
          columnOrder={[
            "category_id",
            "name",
            "created_at",
            "updated_at",
          ]}
          handleView={handleView}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Box>

      <ErrorSnackbar
        message={snackbarMessage}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
        severity="info"
      />
    </Container>
  );
};