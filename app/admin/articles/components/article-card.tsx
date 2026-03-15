"use client";

import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AdminArticle, ArticleStatus } from "../../../lib/types";
import { SECTION_LABEL, STATUS_LABEL } from "../article-config";
import { formatDateTime, getEditorLabel, wasEdited } from "../article-utils";
import { LinkPreview } from "./link-preview";

type Props = {
  item: AdminArticle;
  editedBy?: string;
  onToggleStatus: (id: string, status: ArticleStatus) => void;
  onToggleFeatured: (item: AdminArticle) => void;
  onEdit: (item: AdminArticle) => void;
};

export function ArticleCard({ item, editedBy, onToggleStatus, onToggleFeatured, onEdit }: Props) {
  const edited = wasEdited(item.createdAt, item.updatedAt);
  const editorLabel = getEditorLabel({
    editedBy,
    authorName: item.author?.fullName,
    authorEmail: item.author?.email,
    authorId: item.authorId,
  });
  const editedAtLabel = formatDateTime(item.updatedAt);

  return (
    <article
      className={`rounded-2xl border bg-black/20 p-4 ${
        item.isFeatured
          ? "border-amber-300/55 shadow-[0_0_0_1px_rgba(252,211,77,0.18)]"
          : "border-white/10"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/45">
            {SECTION_LABEL[item.section]} - {item.category}
          </p>
          <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm text-white/68">{item.excerpt}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge
            variant="outline"
            className={
              item.status === "PUBLISHED"
                ? "border-emerald-300/50 text-emerald-200"
                : "border-amber-300/50 text-amber-200"
            }
          >
            {STATUS_LABEL[item.status]}
          </Badge>
          {item.isFeatured ? (
            <Badge className="border border-amber-300/60 bg-amber-300/20 text-amber-100">DESTACADA</Badge>
          ) : null}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-white/65">
        <Pencil className="h-3.5 w-3.5" />
        <span>
          {edited ? `Editado por ${editorLabel} (${editedAtLabel})` : `Sin ediciones. Creado por ${editorLabel}`}
        </span>
      </div>

      <LinkPreview url={item.ctaUrl} />

      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          className="border-white/20 bg-transparent text-white hover:bg-white/10"
          onClick={() => onToggleStatus(item.id, item.status)}
        >
          {item.status === "PUBLISHED" ? "Pasar a borrador" : "Publicar"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="border-white/20 bg-transparent text-white hover:bg-white/10"
          onClick={() => onToggleFeatured(item)}
        >
          {item.isFeatured ? "Quitar destacada" : "Marcar destacada"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="border-white/20 bg-transparent text-white hover:bg-white/10"
          onClick={() => onEdit(item)}
        >
          <Pencil className="mr-1 h-3.5 w-3.5" />
          Editar
        </Button>
      </div>
    </article>
  );
}


