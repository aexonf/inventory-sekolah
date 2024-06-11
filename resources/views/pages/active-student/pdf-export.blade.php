<!DOCTYPE html>
<html>

<head>
</head>

<body>
    <table style="width: 100%">
        <tbody>
            <tr style="margin: 20px; gap: 20px;">
                <td style="width: 50%; margin: 20px; padding: 20px; border: 1px solid black;">
                    <table style="width: 100%;">
                        <tbody>
                            <tr>
                                <td>
                                    <div>
                                        <img src="data:image/png;base64,{!! base64_encode(QrCode::size(30)->generate($activeStudent->id)) !!}" width="100"
                                            height="100" alt="QR Code">
                                    </div>
                                </td>
                                <td>
                                    <div style='padding: 8px;'>
                                        <div>
                                            <p style='margin: 0;'>ID: <b>{{ $activeStudent->student->id_number }}</b></p>
                                        </div>
                                        <div>
                                            <p style='margin: 0;'>Nama: <b>{{ $activeStudent->student->name }}</b></p>
                                        </div>
                                        <div>
                                            <p style='margin: 0;'>Penulis: <b>Sample Writer</b></p>
                                        </div>
                                        <div>
                                            <p style='margin: 0;'>Genre: <b>Sample Genre</b></p>
                                        </div>
                                        <div>
                                            <p style='margin: 0;'>Tahun: <b>Sample Year</b></p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td style="width: 50%;"></td>
            </tr>
        </tbody>
    </table>
</body>

</html>
