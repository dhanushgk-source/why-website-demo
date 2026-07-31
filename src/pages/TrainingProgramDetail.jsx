import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTrainingProgramById } from "../api/trainingPrograms";
import { getModules, createModule, updateModule, deleteModule, reorderModules } from "../api/modules";
import { getLessons, createLesson, updateLesson, deleteLesson, reorderLessons } from "../api/lessons";
import { apiErrorMessage } from "../api/client";
import { LoadingState, ErrorState, EmptyState } from "../components/StateBlock";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import ModuleForm from "../components/ModuleForm";
import LessonForm from "../components/LessonForm";
import { IconPlus } from "../components/icons";

export default function TrainingProgramDetail() {
  const { id } = useParams();

  const [training, setTraining] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  // lessons keyed by module id, and which modules are expanded
  const [lessonsByModule, setLessonsByModule] = useState({});
  const [expanded, setExpanded] = useState({});
  const [lessonsLoading, setLessonsLoading] = useState({});

  // module modal state
  const [moduleModalMode, setModuleModalMode] = useState(null); // "create" | "edit" | null
  const [editingModule, setEditingModule] = useState(null);
  const [moduleSaving, setModuleSaving] = useState(false);
  const [moduleFormError, setModuleFormError] = useState("");
  const [moduleDeleteTarget, setModuleDeleteTarget] = useState(null);
  const [moduleDeleting, setModuleDeleting] = useState(false);

  // lesson modal state — tracks which module the lesson belongs to
  const [lessonModal, setLessonModal] = useState(null); // { mode, moduleId } | null
  const [editingLesson, setEditingLesson] = useState(null);
  const [lessonSaving, setLessonSaving] = useState(false);
  const [lessonFormError, setLessonFormError] = useState("");
  const [lessonDeleteTarget, setLessonDeleteTarget] = useState(null); // { moduleId, lesson }
  const [lessonDeleting, setLessonDeleting] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [trainingData, modulesData] = await Promise.all([getTrainingProgramById(id), getModules(id)]);
      setTraining(trainingData);
      setModules(modulesData);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't load this training program."));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  async function toggleExpand(moduleId) {
    setExpanded((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
    if (!lessonsByModule[moduleId]) {
      setLessonsLoading((prev) => ({ ...prev, [moduleId]: true }));
      try {
        const lessons = await getLessons(moduleId);
        setLessonsByModule((prev) => ({ ...prev, [moduleId]: lessons }));
      } catch (err) {
        setError(apiErrorMessage(err, "Couldn't load lessons for this module."));
      } finally {
        setLessonsLoading((prev) => ({ ...prev, [moduleId]: false }));
      }
    }
  }

  // ---- Module CRUD ----

  async function handleModuleCreate(payload) {
    setModuleSaving(true);
    setModuleFormError("");
    try {
      await createModule(id, payload);
      setModuleModalMode(null);
      setToast("Module added.");
      load();
    } catch (err) {
      setModuleFormError(apiErrorMessage(err, "Couldn't create this module."));
    } finally {
      setModuleSaving(false);
    }
  }

  async function handleModuleUpdate(payload) {
    setModuleSaving(true);
    setModuleFormError("");
    try {
      await updateModule(id, editingModule.id, payload);
      setModuleModalMode(null);
      setEditingModule(null);
      setToast("Module updated.");
      load();
    } catch (err) {
      setModuleFormError(apiErrorMessage(err, "Couldn't save changes."));
    } finally {
      setModuleSaving(false);
    }
  }

  async function handleModuleDelete() {
    setModuleDeleting(true);
    try {
      await deleteModule(id, moduleDeleteTarget.id);
      setModuleDeleteTarget(null);
      setToast("Module removed.");
      load();
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't remove this module."));
    } finally {
      setModuleDeleting(false);
    }
  }

  async function moveModule(moduleId, direction) {
    const index = modules.findIndex((m) => m.id === moduleId);
    const swapWith = index + direction;
    if (swapWith < 0 || swapWith >= modules.length) return;

    const reordered = [...modules];
    [reordered[index], reordered[swapWith]] = [reordered[swapWith], reordered[index]];
    setModules(reordered);

    try {
      await reorderModules(id, reordered.map((m) => m.id));
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't save the new module order."));
      load();
    }
  }

  // ---- Lesson CRUD ----

  async function handleLessonCreate(formData) {
    setLessonSaving(true);
    setLessonFormError("");
    try {
      await createLesson(lessonModal.moduleId, formData);
      const lessons = await getLessons(lessonModal.moduleId);
      setLessonsByModule((prev) => ({ ...prev, [lessonModal.moduleId]: lessons }));
      setLessonModal(null);
      setToast("Lesson added.");
    } catch (err) {
      setLessonFormError(apiErrorMessage(err, "Couldn't create this lesson."));
    } finally {
      setLessonSaving(false);
    }
  }

  async function handleLessonUpdate(formData) {
    setLessonSaving(true);
    setLessonFormError("");
    try {
      await updateLesson(lessonModal.moduleId, editingLesson.id, formData);
      const lessons = await getLessons(lessonModal.moduleId);
      setLessonsByModule((prev) => ({ ...prev, [lessonModal.moduleId]: lessons }));
      setLessonModal(null);
      setEditingLesson(null);
      setToast("Lesson updated.");
    } catch (err) {
      setLessonFormError(apiErrorMessage(err, "Couldn't save changes."));
    } finally {
      setLessonSaving(false);
    }
  }

  async function handleLessonDelete() {
    const { moduleId, lesson } = lessonDeleteTarget;
    setLessonDeleting(true);
    try {
      await deleteLesson(moduleId, lesson.id);
      const lessons = await getLessons(moduleId);
      setLessonsByModule((prev) => ({ ...prev, [moduleId]: lessons }));
      setLessonDeleteTarget(null);
      setToast("Lesson removed.");
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't remove this lesson."));
    } finally {
      setLessonDeleting(false);
    }
  }

  async function moveLesson(moduleId, lessonId, direction) {
    const lessons = lessonsByModule[moduleId] || [];
    const index = lessons.findIndex((l) => l.id === lessonId);
    const swapWith = index + direction;
    if (swapWith < 0 || swapWith >= lessons.length) return;

    const reordered = [...lessons];
    [reordered[index], reordered[swapWith]] = [reordered[swapWith], reordered[index]];
    setLessonsByModule((prev) => ({ ...prev, [moduleId]: reordered }));

    try {
      await reorderLessons(moduleId, reordered.map((l) => l.id));
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't save the new lesson order."));
      const fresh = await getLessons(moduleId);
      setLessonsByModule((prev) => ({ ...prev, [moduleId]: fresh }));
    }
  }

  if (loading) return <LoadingState label="Loading training program…" />;
  if (error && !training) return <ErrorState message={error} onRetry={load} />;

  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">
            <Link to="/trainings" style={{ color: "inherit" }}>
              Training programs
            </Link>{" "}
            / {training?.title}
          </p>
          <h1>{training?.title}</h1>
          <p className="subtitle">Manage the modules and lessons students work through in this program.</p>
        </div>
        <button
          className="btn btn-brass"
          onClick={() => {
            setModuleFormError("");
            setModuleModalMode("create");
          }}
        >
          <IconPlus width={15} height={15} />
          New module
        </button>
      </div>

      {toast && <div className="banner banner-success">{toast}</div>}
      {error && <div className="banner banner-error">{error}</div>}

      {modules.length === 0 ? (
        <div className="table-wrap">
          <EmptyState title="No modules yet" message="Add your first module to start building this training program." />
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {modules.map((mod, index) => (
            <div key={mod.id} className="card card-pad">
              <div className="flex items-center gap-12" style={{ justifyContent: "space-between" }}>
                <button
                  onClick={() => toggleExpand(mod.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", flex: 1 }}
                >
                  <div className="flex items-center gap-8">
                    <span style={{ color: "var(--text-muted)" }}>{expanded[mod.id] ? "▾" : "▸"}</span>
                    <span className="cell-primary" style={{ fontSize: 16 }}>
                      Module {index + 1}: {mod.title}
                    </span>
                  </div>
                  {mod.description && (
                    <p className="cell-muted" style={{ margin: "4px 0 0 22px" }}>
                      {mod.description}
                    </p>
                  )}
                </button>

                <div className="row-actions">
                  <button
                    className="btn btn-outline btn-sm"
                    disabled={index === 0}
                    onClick={() => moveModule(mod.id, -1)}
                    aria-label="Move module up"
                  >
                    ↑
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    disabled={index === modules.length - 1}
                    onClick={() => moveModule(mod.id, 1)}
                    aria-label="Move module down"
                  >
                    ↓
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      setEditingModule(mod);
                      setModuleFormError("");
                      setModuleModalMode("edit");
                    }}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => setModuleDeleteTarget(mod)}>
                    Delete
                  </button>
                </div>
              </div>

              {expanded[mod.id] && (
                <div style={{ marginTop: 16, paddingLeft: 22, borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                  {lessonsLoading[mod.id] ? (
                    <LoadingState label="Loading lessons…" />
                  ) : (
                    <>
                      {(lessonsByModule[mod.id] || []).length === 0 ? (
                        <p className="cell-muted">No lessons in this module yet.</p>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                          {(lessonsByModule[mod.id] || []).map((lesson, lIndex) => (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-12"
                              style={{
                                justifyContent: "space-between",
                                padding: "10px 12px",
                                border: "1px solid var(--border)",
                                borderRadius: "var(--radius-sm)",
                              }}
                            >
                              <div>
                                <span className="cell-primary">{lesson.title}</span>{" "}
                                <span className="cell-muted" style={{ fontSize: 12 }}>
                                  · {lesson.content_type}
                                  {lesson.duration_minutes ? ` · ${lesson.duration_minutes} min` : ""}
                                </span>
                              </div>
                              <div className="row-actions">
                                <button
                                  className="btn btn-outline btn-sm"
                                  disabled={lIndex === 0}
                                  onClick={() => moveLesson(mod.id, lesson.id, -1)}
                                  aria-label="Move lesson up"
                                >
                                  ↑
                                </button>
                                <button
                                  className="btn btn-outline btn-sm"
                                  disabled={lIndex === (lessonsByModule[mod.id] || []).length - 1}
                                  onClick={() => moveLesson(mod.id, lesson.id, 1)}
                                  aria-label="Move lesson down"
                                >
                                  ↓
                                </button>
                                <button
                                  className="btn btn-outline btn-sm"
                                  onClick={() => {
                                    setEditingLesson(lesson);
                                    setLessonFormError("");
                                    setLessonModal({ mode: "edit", moduleId: mod.id });
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => setLessonDeleteTarget({ moduleId: mod.id, lesson })}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          setEditingLesson(null);
                          setLessonFormError("");
                          setLessonModal({ mode: "create", moduleId: mod.id });
                        }}
                      >
                        <IconPlus width={13} height={13} />
                        Add lesson
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {moduleModalMode && (
        <Modal
          title={moduleModalMode === "create" ? "New module" : `Edit “${editingModule?.title}”`}
          onClose={() => {
            setModuleModalMode(null);
            setEditingModule(null);
          }}
          footer={
            <>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setModuleModalMode(null);
                  setEditingModule(null);
                }}
                disabled={moduleSaving}
              >
                Cancel
              </button>
              <button type="submit" form="module-form" className="btn btn-primary" disabled={moduleSaving}>
                {moduleSaving ? "Saving…" : moduleModalMode === "create" ? "Add module" : "Save changes"}
              </button>
            </>
          }
        >
          {moduleFormError && <div className="banner banner-error">{moduleFormError}</div>}
          <ModuleForm
            initial={moduleModalMode === "edit" ? editingModule : null}
            busy={moduleSaving}
            onSubmit={moduleModalMode === "create" ? handleModuleCreate : handleModuleUpdate}
          />
        </Modal>
      )}

      {moduleDeleteTarget && (
        <ConfirmDialog
          title="Delete module"
          message={`“${moduleDeleteTarget.title}” and all of its lessons will be permanently removed.`}
          confirmLabel="Delete module"
          danger
          busy={moduleDeleting}
          onConfirm={handleModuleDelete}
          onClose={() => setModuleDeleteTarget(null)}
        />
      )}

      {lessonModal && (
        <Modal
          title={lessonModal.mode === "create" ? "New lesson" : `Edit “${editingLesson?.title}”`}
          onClose={() => {
            setLessonModal(null);
            setEditingLesson(null);
          }}
          footer={
            <>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setLessonModal(null);
                  setEditingLesson(null);
                }}
                disabled={lessonSaving}
              >
                Cancel
              </button>
              <button type="submit" form="lesson-form" className="btn btn-primary" disabled={lessonSaving}>
                {lessonSaving ? "Saving…" : lessonModal.mode === "create" ? "Add lesson" : "Save changes"}
              </button>
            </>
          }
        >
          {lessonFormError && <div className="banner banner-error">{lessonFormError}</div>}
          <LessonForm
            initial={lessonModal.mode === "edit" ? editingLesson : null}
            busy={lessonSaving}
            onSubmit={lessonModal.mode === "create" ? handleLessonCreate : handleLessonUpdate}
          />
        </Modal>
      )}

      {lessonDeleteTarget && (
        <ConfirmDialog
          title="Delete lesson"
          message={`“${lessonDeleteTarget.lesson.title}” will be permanently removed.`}
          confirmLabel="Delete lesson"
          danger
          busy={lessonDeleting}
          onConfirm={handleLessonDelete}
          onClose={() => setLessonDeleteTarget(null)}
        />
      )}
    </>
  );
}
