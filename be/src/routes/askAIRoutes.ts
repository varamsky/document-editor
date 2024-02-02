import { Router } from "express";
import controller from "../controllers/askAIController";

const router = Router();

router.post("/rephrase", controller.askAIRephraseController);
router.post("/grammar", controller.askAIGrammarController);
router.post("/tone", controller.askAIToneController);

export default router;
