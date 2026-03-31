import type { Locale } from '../date/locale.js';
import { languageOf, normalizeLocale } from '../date/locale.js';

export type DropzoneLocale = Locale;

export type DropzoneErrorRule =
    | 'required'
    | 'fileTooLarge'
    | 'fileTooSmall'
    | 'invalidFileType'
    | 'maxFilesReached'
    | 'onlyNMoreFiles';

type Lang = ReturnType<typeof languageOf>;

export function normalizeKey(locale?: string): DropzoneLocale {
    return normalizeLocale(locale);
}

const titlesByLang: Record<
    Lang,
    { dropzoneTitle: string; dragTitle: string; fileLoadedTitle: string; maxFilesReachedTitle: string }
> = {
    en: {
        dropzoneTitle: 'Drop files here or click to browse',
        dragTitle: 'Drop files to upload',
        fileLoadedTitle: 'File selected',
        maxFilesReachedTitle: 'Maximum files reached',
    },
    de: {
        dropzoneTitle: 'Dateien hier ablegen oder klicken zum Auswählen',
        dragTitle: 'Dateien zum Hochladen ablegen',
        fileLoadedTitle: 'Datei ausgewählt',
        maxFilesReachedTitle: 'Maximale Anzahl erreicht',
    },
    es: {
        dropzoneTitle: 'Suelta archivos aquí o haz clic para buscar',
        dragTitle: 'Suelta archivos para subirlos',
        fileLoadedTitle: 'Archivo seleccionado',
        maxFilesReachedTitle: 'Máximo de archivos alcanzado',
    },
    fr: {
        dropzoneTitle: 'Déposez des fichiers ici ou cliquez pour parcourir',
        dragTitle: 'Déposez les fichiers pour les téléverser',
        fileLoadedTitle: 'Fichier sélectionné',
        maxFilesReachedTitle: 'Nombre maximal de fichiers atteint',
    },
    it: {
        dropzoneTitle: 'Trascina i file qui o fai clic per selezionare',
        dragTitle: 'Rilascia i file per caricarli',
        fileLoadedTitle: 'File selezionato',
        maxFilesReachedTitle: 'Numero massimo di file raggiunto',
    },
    zh: {
        dropzoneTitle: '将文件拖到此处或点击浏览',
        dragTitle: '松开以上传文件',
        fileLoadedTitle: '已选择文件',
        maxFilesReachedTitle: '已达到最大文件数',
    },
    ru: {
        dropzoneTitle: 'Перетащите файлы сюда или нажмите для выбора',
        dragTitle: 'Отпустите файлы для загрузки',
        fileLoadedTitle: 'Файл выбран',
        maxFilesReachedTitle: 'Достигнут максимум файлов',
    },
    tr: {
        dropzoneTitle: 'Dosyaları buraya bırakın veya seçmek için tıklayın',
        dragTitle: 'Yüklemek için dosyaları bırakın',
        fileLoadedTitle: 'Dosya seçildi',
        maxFilesReachedTitle: 'Maksimum dosya sayısına ulaşıldı',
    },
    da: {
        dropzoneTitle: 'Slip filer her eller klik for at vælge',
        dragTitle: 'Slip filer for at uploade',
        fileLoadedTitle: 'Fil valgt',
        maxFilesReachedTitle: 'Maksimalt antal filer nået',
    },
};

export function getDropzoneTitles(locale?: string) {
    return titlesByLang[languageOf(locale)];
}

function fileWord(lang: Lang, n: number) {
    if (lang === 'en') return n === 1 ? 'file' : 'files';
    if (lang === 'de') return n === 1 ? 'Datei' : 'Dateien';
    if (lang === 'es') return n === 1 ? 'archivo' : 'archivos';
    if (lang === 'fr') return n === 1 ? 'fichier' : 'fichiers';
    if (lang === 'it') return n === 1 ? 'file' : 'file';
    if (lang === 'zh') return '个文件';
    if (lang === 'ru') {
        const mod10 = n % 10;
        const mod100 = n % 100;
        if (mod10 === 1 && mod100 !== 11) return 'файл';
        if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return 'файла';
        return 'файлов';
    }
    if (lang === 'tr') return 'dosya';
    if (lang === 'da') return n === 1 ? 'fil' : 'filer';
    return n === 1 ? 'file' : 'files';
}

const errorByLang: Record<Lang, Record<DropzoneErrorRule, (p?: Record<string, string | number>) => string>> = {
    en: {
        required: () => 'Please select at least one file.',
        fileTooLarge: p => `File "${p?.name}" exceeds the maximum size of ${p?.max}.`,
        fileTooSmall: p => `File "${p?.name}" is smaller than the minimum size of ${p?.min}.`,
        invalidFileType: p => `File "${p?.name}" has an invalid file type.`,
        maxFilesReached: p => `Maximum number of files (${p?.maxFiles}) already reached.`,
        onlyNMoreFiles: p => `Only ${p?.remaining} more ${fileWord('en', Number(p?.remaining))} can be added.`,
    },
    de: {
        required: () => 'Bitte mindestens eine Datei auswählen.',
        fileTooLarge: p => `Datei „${p?.name}“ überschreitet die maximale Größe von ${p?.max}.`,
        fileTooSmall: p => `Datei „${p?.name}“ ist kleiner als die minimale Größe von ${p?.min}.`,
        invalidFileType: p => `Datei „${p?.name}“ hat einen ungültigen Dateityp.`,
        maxFilesReached: p => `Maximale Anzahl an Dateien (${p?.maxFiles}) bereits erreicht.`,
        onlyNMoreFiles: p =>
            `Es können nur noch ${p?.remaining} ${fileWord('de', Number(p?.remaining))} hinzugefügt werden.`,
    },
    es: {
        required: () => 'Selecciona al menos un archivo.',
        fileTooLarge: p => `El archivo "${p?.name}" supera el tamaño máximo de ${p?.max}.`,
        fileTooSmall: p => `El archivo "${p?.name}" es menor que el tamaño mínimo de ${p?.min}.`,
        invalidFileType: p => `El archivo "${p?.name}" tiene un tipo de archivo no válido.`,
        maxFilesReached: p => `Ya se alcanzó el número máximo de archivos (${p?.maxFiles}).`,
        onlyNMoreFiles: p => `Solo se pueden añadir ${p?.remaining} ${fileWord('es', Number(p?.remaining))} más.`,
    },
    fr: {
        required: () => 'Veuillez sélectionner au moins un fichier.',
        fileTooLarge: p => `Le fichier « ${p?.name} » dépasse la taille maximale de ${p?.max}.`,
        fileTooSmall: p => `Le fichier « ${p?.name} » est inférieur à la taille minimale de ${p?.min}.`,
        invalidFileType: p => `Le fichier « ${p?.name} » a un type de fichier non valide.`,
        maxFilesReached: p => `Le nombre maximum de fichiers (${p?.maxFiles}) est déjà atteint.`,
        onlyNMoreFiles: p =>
            `Vous pouvez ajouter seulement ${p?.remaining} ${fileWord('fr', Number(p?.remaining))} supplémentaire(s).`,
    },
    it: {
        required: () => 'Seleziona almeno un file.',
        fileTooLarge: p => `Il file "${p?.name}" supera la dimensione massima di ${p?.max}.`,
        fileTooSmall: p => `Il file "${p?.name}" è più piccolo della dimensione minima di ${p?.min}.`,
        invalidFileType: p => `Il file "${p?.name}" ha un tipo di file non valido.`,
        maxFilesReached: p => `Numero massimo di file (${p?.maxFiles}) già raggiunto.`,
        onlyNMoreFiles: p =>
            `È possibile aggiungere solo altri ${p?.remaining} ${fileWord('it', Number(p?.remaining))}.`,
    },
    zh: {
        required: () => '请至少选择一个文件。',
        fileTooLarge: p => `文件“${p?.name}”超过最大大小 ${p?.max}。`,
        fileTooSmall: p => `文件“${p?.name}”小于最小大小 ${p?.min}。`,
        invalidFileType: p => `文件“${p?.name}”的类型无效。`,
        maxFilesReached: p => `已达到最大文件数（${p?.maxFiles}）。`,
        onlyNMoreFiles: p => `只能再添加 ${p?.remaining}${fileWord('zh', Number(p?.remaining))}。`,
    },
    ru: {
        required: () => 'Выберите хотя бы один файл.',
        fileTooLarge: p => `Файл «${p?.name}» превышает максимальный размер ${p?.max}.`,
        fileTooSmall: p => `Файл «${p?.name}» меньше минимального размера ${p?.min}.`,
        invalidFileType: p => `Файл «${p?.name}» имеет недопустимый тип.`,
        maxFilesReached: p => `Максимальное количество файлов (${p?.maxFiles}) уже достигнуто.`,
        onlyNMoreFiles: p => `Можно добавить только ещё ${p?.remaining} ${fileWord('ru', Number(p?.remaining))}.`,
    },
    tr: {
        required: () => 'Lütfen en az bir dosya seçin.',
        fileTooLarge: p => `"${p?.name}" dosyası maksimum boyut olan ${p?.max} değerini aşıyor.`,
        fileTooSmall: p => `"${p?.name}" dosyası minimum boyut olan ${p?.min} değerinden küçük.`,
        invalidFileType: p => `"${p?.name}" dosya türü geçersiz.`,
        maxFilesReached: p => `Maksimum dosya sayısına (${p?.maxFiles}) zaten ulaşıldı.`,
        onlyNMoreFiles: p => `Sadece ${p?.remaining} adet daha ${fileWord('tr', Number(p?.remaining))} eklenebilir.`,
    },
    da: {
        required: () => 'Vælg mindst én fil.',
        fileTooLarge: p => `Filen "${p?.name}" overstiger den maksimale størrelse på ${p?.max}.`,
        fileTooSmall: p => `Filen "${p?.name}" er mindre end den minimale størrelse på ${p?.min}.`,
        invalidFileType: p => `Filen "${p?.name}" har en ugyldig filtype.`,
        maxFilesReached: p => `Maksimalt antal filer (${p?.maxFiles}) er allerede nået.`,
        onlyNMoreFiles: p => `Der kan kun tilføjes ${p?.remaining} ${fileWord('da', Number(p?.remaining))} mere.`,
    },
};

export function formatDropzoneError(locale: string, rule: DropzoneErrorRule, params?: Record<string, string | number>) {
    return errorByLang[languageOf(locale)][rule](params);
}

export function formatFileSize(locale: string, bytes: number) {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';

    const k = 1024;
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(k)));
    const value = bytes / Math.pow(k, i);

    const nf = new Intl.NumberFormat(normalizeLocale(locale), {
        maximumFractionDigits: i === 0 ? 0 : 2,
        minimumFractionDigits: 0,
    });

    return `${nf.format(value)} ${units[i]}`;
}
