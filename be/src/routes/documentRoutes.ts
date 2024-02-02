import { Router } from "express";
import {
  documentController,
  getUserDocumentController,
  getAllVersionController,
  restoreVersionController,
  createTemplateController,
  getTemplateController,
  createVersionController,
  getDocumentController,
  getVersionDataController,
  UpdateTitleController,
  updateTemplateImageController,
  removeDocController,
  createColorController,
  retrieveColorController,
  UpdateMarginsController
} from "../controllers/documentController";
import multer from "multer";
// import { getExample, getExampleData } from "../controllers/exampleControllers";
// import { getExampleDataValidation } from "../validation/exampleValidation/exampleValidation";

const router = Router();
const upload = multer();

// router.post("/", getExampleDataValidation, getExampleData);

router.post("/document", documentController);
router.get("/getDocuments/:userId", getUserDocumentController);
router.get("/getVersions/:id", getAllVersionController);
router.post("/restoreVersion", restoreVersionController);
router.post("/create-template", createTemplateController);
router.get("/get-template", getTemplateController);
router.post("/create-version", createVersionController);
router.get("/getDocument/:documentId", getDocumentController);
router.get("/getVersionData/:versionId", getVersionDataController);
router.post("/updateTitle/:documentId", UpdateTitleController);
router.get("/removeDoc/:documentId", removeDocController);
router.post(
  "/uploadImage/:templateId",
  upload.none(),
  updateTemplateImageController
);
router.post("/create-color", createColorController);
router.get("/colors/:documentId", retrieveColorController);
router.post("/updateMargins/:documentId", UpdateMarginsController);

export default router;
