<!DOCTYPE html>
<html>

<head>
</head>

<body>
    <table style="width: 100%">
        <tbody>
            @foreach ($data as $index => $item)
                @if ($index % 2 == 0)
                    @if ($index != 0)
                        </tr>
                    @endif
                    <tr style="margin: 20px; gap: 20px;">
                @endif
                <td style="width: 50%; margin: 20px; padding: 20px; border: 1px solid black;">
                    <table style="width: 100%;">
                        <tbody>
                            <tr>
                                <td style="width: 108px;">
                                    <div>
                                        <img src="data:image/png;base64,{!! base64_encode(QrCode::size(30)->generate($item->id_number)) !!}" width="100"
                                            height="100" alt="QR Code">
                                    </div>
                                </td>
                                <td style="vertical-align: top;">
                                    <div>
                                        <div>
                                            <p style='margin: 0;'>ID: <b>{{ $item->id_number }}</b></p>
                                        </div>
                                        <div>
                                            <p style='margin: 0;'>Username: <b>{{ $item->user->username }}</b></p>
                                        </div>
                                        <div>
                                            <p style='margin: 0;'>Nama: <b>{{ $item->name }}</b></p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                @if ($loop->last || $loop->iteration % 2 == 0)
                    </tr>
                @endif
            @endforeach
        </tbody>
    </table>
</body>

</html>
