import { motion, AnimatePresence } from "framer-motion";
import { FaInfoCircle, FaChevronDown } from "react-icons/fa";

export default function NodeInfoPanel({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="node-info-panel"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 340,
            height: "100%",
            background: "rgba(255,255,255,0.98)",
            boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
            borderRadius: "18px 0 0 18px",
            zIndex: 100,
            padding: "24px 20px",
            overflowY: "auto"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
            <FaInfoCircle style={{ color: "#6366f1", fontSize: 22, marginRight: 10 }} />
            <h2 style={{ fontWeight: 700, fontSize: 20 }}>Input Node</h2>
            <button onClick={onClose} style={{ marginLeft: "auto", background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>
              <FaChevronDown />
            </button>
          </div>
          <section>
            <h3>Overview</h3>
            <p>Pass values of various data types into your pipeline. Input nodes allow you to pass data into a pipeline. While not always, inputs are usually the start of a pipeline.</p>
          </section>
          <section>
            <h3>Node Inputs</h3>
            <p>The input node does not have any node inputs.</p>
          </section>
          <section>
            <h3>Node Parameters</h3>
            <ul>
              <li><b>Type:</b> The data type that the input will allow. Use the Type dropdown to signify the data type:</li>
              <li><b>Text (default):</b> raw text (e.g., a user message, text from an article, etc).</li>
              <li><b>File:</b> PDF, Doc, Docx, txt, xls, xlsx, csv, rtf, odt, tsv, ods, JPEG, PNG, etc.</li>
              <li><b>Audio:</b> Audio recording that you can record through the VectorShift platform.</li>
            </ul>
          </section>
          <section>
            <h3>Node Outputs</h3>
            <ul>
              <li><b>Text:</b> the inputted text <span className="badge badge-text">Text</span></li>
              <li><b>Processed_text:</b> The inputted file processed into text <span className="badge badge-text">Text</span></li>
              <li><b>File:</b> The inputted file <span className="badge badge-file">File</span></li>
              <li><b>Audio:</b> The inputted audio <span className="badge badge-audio">Audio</span></li>
            </ul>
          </section>
          <section>
            <h3>Considerations</h3>
            <ul>
              <li>Most common nodes to connect: LLM node, Knowledge Base node.</li>
              <li>You can expose input to end users by exporting the pipeline.</li>
              <li>Chat, Form, Voicebot interfaces each use different input/output types.</li>
            </ul>
          </section>
          <section>
            <h3>Example</h3>
            <pre style={{ background: "#f3f4f6", borderRadius: 8, padding: 12, fontSize: 13 }}>
{`Input Node: Represents the user message
Knowledge Base Reader Node: Queries the knowledge base semantically
Search Query: {{input_0.text}}
LLM Node: Responds to the user question
System (Instructions): Answer the question based on the context.
Prompt: Question: {{input_0.text}} Context: {{knowledge_base_1.chunks}}
Output Node: Displays the response
Output: {{openai_0.response}}`}
            </pre>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
