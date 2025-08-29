import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
	Bold,
	Heading1,
	Heading2,
	Image as ImageIcon,
	Italic,
	List,
	ListOrdered,
	Quote,
	Redo,
	Undo,
	Youtube as YoutubeIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RichTextEditorProps {
	content: string;
	onChange: (content: string) => void;
	placeholder?: string;
}

const RichTextEditor = ({
	content,
	onChange,
	placeholder = "Escribe tu guía aquí...",
}: RichTextEditorProps) => {
	const [imageUrl, setImageUrl] = useState("");
	const [youtubeUrl, setYoutubeUrl] = useState("");
	const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
	const [isYoutubeDialogOpen, setIsYoutubeDialogOpen] = useState(false);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Image.configure({
				HTMLAttributes: {
					class: "rounded-lg max-w-full h-auto",
				},
			}),
			Youtube.configure({
				width: 640,
				height: 480,
				HTMLAttributes: {
					class: "rounded-lg mx-auto",
				},
			}),
		],
		content,
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			onChange(html);
		},
		editorProps: {
			attributes: {
				class:
					"prose prose-invert max-w-none min-h-[400px] p-4 focus:outline-none",
			},
		},
	});

	if (!editor) {
		return null;
	}

	const addImage = () => {
		if (imageUrl) {
			editor.chain().focus().setImage({ src: imageUrl }).run();
			setImageUrl("");
			setIsImageDialogOpen(false);
		}
	};

	const addYoutube = () => {
		if (youtubeUrl) {
			editor.commands.setYoutubeVideo({
				src: youtubeUrl,
				width: 640,
				height: 480,
			});
			setYoutubeUrl("");
			setIsYoutubeDialogOpen(false);
		}
	};

	return (
		<div className="border border-border rounded-lg bg-card">
			{/* Toolbar */}
			<div className="border-b border-border p-3 flex flex-wrap gap-2">
				{/* Text Formatting */}
				<div className="flex gap-1">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => editor.chain().focus().toggleBold().run()}
						className={editor.isActive("bold") ? "bg-primary/20" : ""}
					>
						<Bold className="h-4 w-4" />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => editor.chain().focus().toggleItalic().run()}
						className={editor.isActive("italic") ? "bg-primary/20" : ""}
					>
						<Italic className="h-4 w-4" />
					</Button>
				</div>

				{/* Headings */}
				<div className="flex gap-1">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 1 }).run()
						}
						className={
							editor.isActive("heading", { level: 1 }) ? "bg-primary/20" : ""
						}
					>
						<Heading1 className="h-4 w-4" />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 2 }).run()
						}
						className={
							editor.isActive("heading", { level: 2 }) ? "bg-primary/20" : ""
						}
					>
						<Heading2 className="h-4 w-4" />
					</Button>
				</div>

				{/* Lists */}
				<div className="flex gap-1">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						className={editor.isActive("bulletList") ? "bg-primary/20" : ""}
					>
						<List className="h-4 w-4" />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						className={editor.isActive("orderedList") ? "bg-primary/20" : ""}
					>
						<ListOrdered className="h-4 w-4" />
					</Button>
				</div>

				{/* Quote */}
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={editor.isActive("blockquote") ? "bg-primary/20" : ""}
				>
					<Quote className="h-4 w-4" />
				</Button>

				{/* Media */}
				<div className="flex gap-1">
					<Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
						<DialogTrigger asChild>
							<Button type="button" variant="ghost" size="sm">
								<ImageIcon className="h-4 w-4" />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Insertar Imagen</DialogTitle>
							</DialogHeader>
							<div className="space-y-4">
								<div>
									<Label htmlFor="image-url">URL de la imagen</Label>
									<Input
										id="image-url"
										value={imageUrl}
										onChange={(e) => setImageUrl(e.target.value)}
										placeholder="https://ejemplo.com/imagen.jpg"
										className="mt-2"
									/>
								</div>
								<div className="flex gap-2">
									<Button onClick={addImage} disabled={!imageUrl}>
										Insertar
									</Button>
									<Button
										variant="outline"
										onClick={() => setIsImageDialogOpen(false)}
									>
										Cancelar
									</Button>
								</div>
							</div>
						</DialogContent>
					</Dialog>

					<Dialog
						open={isYoutubeDialogOpen}
						onOpenChange={setIsYoutubeDialogOpen}
					>
						<DialogTrigger asChild>
							<Button type="button" variant="ghost" size="sm">
								<YoutubeIcon className="h-4 w-4" />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Insertar Video de YouTube</DialogTitle>
							</DialogHeader>
							<div className="space-y-4">
								<div>
									<Label htmlFor="youtube-url">URL del video</Label>
									<Input
										id="youtube-url"
										value={youtubeUrl}
										onChange={(e) => setYoutubeUrl(e.target.value)}
										placeholder="https://www.youtube.com/watch?v=..."
										className="mt-2"
									/>
								</div>
								<div className="flex gap-2">
									<Button onClick={addYoutube} disabled={!youtubeUrl}>
										Insertar
									</Button>
									<Button
										variant="outline"
										onClick={() => setIsYoutubeDialogOpen(false)}
									>
										Cancelar
									</Button>
								</div>
							</div>
						</DialogContent>
					</Dialog>
				</div>

				{/* History */}
				<div className="flex gap-1 ml-auto">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().undo()}
					>
						<Undo className="h-4 w-4" />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => editor.chain().focus().redo().run()}
						disabled={!editor.can().redo()}
					>
						<Redo className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* Editor */}
			<EditorContent editor={editor} />
		</div>
	);
};

export default RichTextEditor;
